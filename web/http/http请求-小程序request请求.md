##  小程序请求

###  简单版

```js
interface RequestOptions extends UniApp.RequestOptions {
	loading?: boolean; // 是否显示loading
	auth?: boolean; // 是否需要token
	debounceTime?: number; // loading防抖时间
}

const ERROR_PREFIX = "请求失败";

import { useUserStore } from "@/store/modules/user";
import { HTTP_STATUS, BUSINESS_STATUS } from "@/common/constants/http";

class HttpRequest {
	private pendingRequests: Map<string, Function> = new Map();
	private loadingTimer: number | null = null;
	private loadingCount = 0;

	// 生成请求Key
	private generateRequestKey(options: RequestOptions): string {
		const { url, method = "GET", data } = options;
		return `${method}_${url}_${JSON.stringify(data)}`;
	}

	private isAbortControllerSupported(): boolean {
		return typeof AbortController !== "undefined";
	}

	// 添加pending请求的方法
	private addPendingRequest(options: RequestOptions, cancelFn: Function) {
		const requestKey = this.generateRequestKey(options);
		this.pendingRequests.set(requestKey, cancelFn);
	}

	// 移除pending请求
	private removePendingRequest(options: RequestOptions) {
		const requestKey = this.generateRequestKey(options);
		this.pendingRequests.delete(requestKey);
	}

	// 取消请求的方法
	private cancelPendingRequest(options: RequestOptions) {
		const requestKey = this.generateRequestKey(options);
		const cancelFn = this.pendingRequests.get(requestKey);
		if (cancelFn) {
			cancelFn();
			this.pendingRequests.delete(requestKey);
		}
	}

	// Loading控制
	private showLoading(debounceTime = 300) {
		this.loadingCount++;

		if (this.loadingTimer) {
			clearTimeout(this.loadingTimer);
		}

		this.loadingTimer = setTimeout(() => {
			if (this.loadingCount > 0) {
			}
		}, debounceTime);
	}

	private hideLoading() {
		this.loadingCount--;

		if (this.loadingCount <= 0) {
			if (this.loadingTimer) {
				clearTimeout(this.loadingTimer);
				this.loadingTimer = null;
			}
			this.loadingCount = 0;
			const timer = setTimeout(() => {
				clearTimeout(timer);
			}, 2000);
		}
	}

	// 错误处理
	private handleError(error: any, options: RequestOptions) {
		const userStore = useUserStore();
		console.log(ERROR_PREFIX + "   >>>>>  ", error);

		// HTTP错误
		if (error.code) {
			switch (error.code) {
				case HTTP_STATUS.UNAUTHORIZED:
					// userStore.logout();
					uni.navigateTo({ url: "/pages/login/index" });
					error.message = "未授权或登录已过期";
					break;
				case HTTP_STATUS.FORBIDDEN:
					error.message = "没有权限";
					break;
				case HTTP_STATUS.NOT_FOUND:
					error.message = "请求的资源不存在";
					break;
				case HTTP_STATUS.SERVER_ERROR:
					error.message =
						error.errorMsg || error.msg || error.message || "服务器错误";
					break;
				default:
					error.message = "网络异常，请稍后重试";
			}
		}

		// // 业务错误
		// if (error.code) {
		// 	switch (error.code) {
		// 		case BUSINESS_STATUS.TOKEN_EXPIRED:
		// 		case BUSINESS_STATUS.INVALID_TOKEN:
		// 			userStore.logout();
		// 			uni.navigateTo({ url: "/pages/index/index" });
		// 			break;
		// 		default:
		// 	}
		// }

		throw error;
	}

	// 主请求方法
	async request<T = any>(options: RequestOptions): Promise<BaseResponse<T>> {
		const {
			loading = true,
			auth = true,
			debounceTime = 300,
			...requestOptions
		} = options;

		// 取消重复请求
		this.cancelPendingRequest(options);

		// 显示loading
		if (loading) {
			this.showLoading(debounceTime);
		}

		try {
			const userStore = useUserStore();
			const header: Record<string, string> = { ...options.header };

			if (auth && userStore.token) {
				header[`Authorization`] = ` ${userStore.token}`;
			}

			return await new Promise((resolve, reject) => {
				const task = uni.request({
					...requestOptions,
					header,
					url: import.meta.env.VITE_QD_BASE_URL + options.url,
					timeout: Number(import.meta.env.VITE_APP_REQUEST_TIMEOUT) || 60000,
					success: (res: any) => {
						if (
							res.data.code === BUSINESS_STATUS.SUCCESSCODE ||
							res.data.status === BUSINESS_STATUS.SUCCESSTIP
						) {
							console.log("请求成功   >>>   ", res.data);
							resolve(res.data);
						} else {
							reject(res.data);
						}
					},
					fail: reject,
				});

				// 存储取消函数
				this.addPendingRequest(options, () => {
					task.abort();
				});
			});
		} catch (error: any) {
			this.handleError(error, options);
			return Promise.reject(error);
		} finally {
			if (loading) {
				this.hideLoading();
			}
			this.removePendingRequest(options);
		}
	}

	// 便捷请求方法
	async get<T = any>(
		url: string,
		data?: any,
		options?: Partial<RequestOptions>
	) {
		return this.request<T>({
			url,
			method: "GET",
			data,
			...options,
		});
	}

	async post<T = any>(
		url: string,
		data?: any,
		options?: Partial<RequestOptions>
	) {
		return this.request<T>({
			url,
			method: "POST",
			data,
			...options,
		});
	}

	async put<T = any>(
		url: string,
		data?: any,
		options?: Partial<RequestOptions>
	) {
		return this.request<T>({
			url,
			method: "PUT",
			data,
			...options,
		});
	}

	async delete<T = any>(
		url: string,
		data?: any,
		options?: Partial<RequestOptions>
	) {
		return this.request<T>({
			url,
			method: "DELETE",
			data,
			...options,
		});
	}
}

export const http = new HttpRequest();

// 默认导出实例
export default http;

```

###  精细版

```js
import { HTTP_STATUS, BUSINESS_STATUS } from "@/common/constants/http";
import errorCode from "./errorCode";

const startTime = Date.now();

type UserStoreType = any;
// 在模块顶部获取应用实例
const app = getApp<{ $store?: { user: ReturnType<typeof getUserStore> } }>();
const getUserStore = (): UserStoreType | undefined => app.$store?.user;

interface RequestOptions extends UniApp.RequestOptions {
	loading?: boolean;
	auth?: boolean;
	debounceTime?: number;
	__isRetry?: boolean;
}

interface BaseResponse<T = any> {
	code: number;
	data: T;
	msg?: string;
	status?: string;
}

// Token 处理工具函数
const tokenUtil = {
	get: (): { accessToken?: string; refreshToken?: string } =>
		uni.getStorageSync("token") || {},

	set: (tokenObj: { accessToken: string; refreshToken: string }) =>
		uni.setStorageSync("token", tokenObj),

	clear: () => uni.removeStorageSync("token"),
};

class HttpRequest {
	private pendingRequests = new Map<string, { cancel: Function }>();
	private loadingTimer: ReturnType<typeof setTimeout> | null = null;
	private loadingCount = 0;

	// 新增：全局正在刷新Promise
	private refreshingPromise: Promise<any> | null = null;
	// 新增：防止多次跳转登录
	private isNavigatingToLogin = false;

	// ---- 1. 生成唯一请求Key，FormData类型不做去重 ----
	private generateRequestKey(options: RequestOptions): string | null {
		const { url, method = "GET", data } = options;

		// 仅对象与字符串可做 key。ArrayBuffer、function、binary 不参与去重。
		if (data === null || data === undefined) {
			return `${method}_${url}`;
		}

		if (
			(typeof ArrayBuffer !== "undefined" && data instanceof ArrayBuffer) || // 小程序用二进制
			typeof data === "function" ||
			typeof data === "symbol"
		) {
			return null; // 此类不去重
		}

		try {
			// 对象需保证key顺序一致（避免{a:1,b:2}和{b:2,a:1}被当做不同）
			const dataString =
				typeof data === "object"
					? JSON.stringify(data, Object.keys(data).sort())
					: data;
			return `${method}_${url}_${dataString}`;
		} catch (e) {
			// 数据无法被序列化（如含循环引用），不去重
			return null;
		}
	}

	// ---- 2. 只为可去重的请求维护pending ----
	private addPendingRequest(requestKey: string | null, cancelFn: Function) {
		if (requestKey) this.pendingRequests.set(requestKey, { cancel: cancelFn });
	}
	private removePendingRequest(requestKey: string | null) {
		if (requestKey) this.pendingRequests.delete(requestKey);
	}
	private cancelPendingRequest(requestKey: string | null) {
		if (!requestKey) return;
		const req = this.pendingRequests.get(requestKey);
		req?.cancel();
		this.pendingRequests.delete(requestKey);
	}

	// 显示 Loading
	private showLoading(debounceTime = 300) {
		this.loadingCount++;

		// 清除现有计时器
		if (this.loadingTimer) {
			clearTimeout(this.loadingTimer);
			this.loadingTimer = null;
		}

		// 设置新的计时器
		if (this.loadingCount === 1) {
			this.loadingTimer = setTimeout(() => {
				uni.showLoading({ title: "加载中...", mask: true });
			}, debounceTime);
		}
	}

	// 隐藏 Loading
	private hideLoading() {
		this.loadingCount = Math.max(0, this.loadingCount - 1);

		if (this.loadingCount <= 0 && this.loadingTimer) {
			clearTimeout(this.loadingTimer);
			this.loadingTimer = null;
			uni.hideLoading();
		}
	}

	// 处理业务错误
	private async handleBusinessError(error: any) {
		const userStore = getUserStore();

		// Token 失效处理FormData
		if (
			[BUSINESS_STATUS.TOKEN_EXPIRED, BUSINESS_STATUS.INVALID_TOKEN].includes(
				error.code
			)
		) {
			userStore?.logout?.();
			uni.reLaunch({ url: "/pages/login/index" });
		} else {
			const msg = error.msg || errorCode[error.code] || "操作失败";
			uni.showToast({ icon: "none", title: msg, duration: 2000 });
		}
	}

	// 脱敏打印请求头
	private _maskSensitiveInfo(
		headers: Record<string, string> | undefined
	): Record<string, string> {
		if (!headers) return {};
		const masked = { ...headers };
		if (masked.Authorization) {
			masked.Authorization = masked.Authorization.slice(0, 10) + "*****";
		}
		return masked;
	}

	// 序列化数据，防止太大
	private _stringifyData(data: any, maxLen = 500): string {
		if (data == null) return "null";
		if (typeof ArrayBuffer !== "undefined" && data instanceof ArrayBuffer)
			return `[ArrayBuffer ${data.byteLength} bytes]`;
		if (typeof data === "object") {
			try {
				const str = JSON.stringify(data);
				if (str.length > maxLen) return str.slice(0, maxLen) + "...";
				return str;
			} catch {
				return "[Unstringifiable Object]";
			}
		}
		return String(data);
	}

	// ---- 3. 核心请求方法，支持FormData不做pending ----
	async request<T = any>(options: RequestOptions): Promise<BaseResponse<T>> {
		const {
			loading = true,
			auth = true,
			debounceTime = 300,
			__isRetry = false,
			...requestOptions
		} = options;

		const requestKey = this.generateRequestKey(options);

		// 仅非FormData参与取消重复请求
		if (!__isRetry && requestKey) {
			this.cancelPendingRequest(requestKey);
		}

		if (loading) this.showLoading(debounceTime);

		try {
			return await this._sendRequest<T>(
				requestOptions,
				requestKey,
				auth,
				__isRetry,
				options
			);
		} catch (error: any) {
			// 传入原始请求参数做自动重试
			await this._handleRequestError(error, __isRetry, options);
			throw error;
		} finally {
			if (loading) this.hideLoading();
			if (!__isRetry && requestKey) this.removePendingRequest(requestKey);
		}
	}

	// ---- 4. 发送请求实现 ----
	private async _sendRequest<T>(
		options: RequestOptions,
		requestKey: string | null,
		auth: boolean,
		isRetry: boolean,
		originalOptions: RequestOptions
	): Promise<BaseResponse<T>> {
		return new Promise((resolve, reject) => {
			const header: Record<string, string> = { ...options.header };
			const { accessToken } = tokenUtil.get();

			// 认证处理
			if (auth) {
				if (!accessToken) {
					this.handleLoginRedirect("请先登录");
					return reject({ code: HTTP_STATUS.UNAUTHORIZED, msg: "请先登录" });
				}
				header.Authorization = `${accessToken}`;
			}

			const baseURL = import.meta.env.VITE_QD_BASE_URL || "";
			const fullURL = baseURL ? baseURL + options.url : options.url;

			console.log(
				`[请求] 开始: ${options.method} ${options.url} 
				数据: ${JSON.stringify(options.data)} 
				请求头: ${JSON.stringify(this._maskSensitiveInfo(options.header))} 
				重试: ${options.__isRetry ? "是" : "否"}`
			);

			const task = uni.request({
				...options,
				url: fullURL,
				header,
				timeout: Number(import.meta.env.VITE_APP_REQUEST_TIMEOUT) || 60000,
				success: res => {
					const endTime = Date.now();
					console.log(
						`[响应] 成功: 方法: ${options.method} URL: ${fullURL}
							状态码: ${res.statusCode}
							耗时: ${endTime - startTime}ms
							数据: ${this._stringifyData(res.data)}`
					);
					this._handleSuccess(res, resolve, reject);
				},
				fail: err => {
					const endTime = Date.now();
					console.log(
						`[响应] 失败: 方法: ${options.method} URL: ${fullURL}
							错误: ${JSON.stringify(err)}
							耗时: ${endTime - startTime}ms`
					);
					this._handleFailure(err, reject);
				},
			});

			if (!isRetry && requestKey) {
				this.addPendingRequest(requestKey, () => task.abort());
			}
		});
	}

	// 请求成功处理
	private _handleSuccess<T>(
		res: UniApp.RequestSuccessCallbackResult,
		resolve: (value: BaseResponse<T>) => void,
		reject: (reason?: any) => void
	) {
		const { statusCode, data } = res;
		console.log("请求成功", statusCode, data);

		if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
			reject({ code: statusCode, data });
		} else if (
			data?.code === BUSINESS_STATUS.SUCCESSCODE ||
			data?.status === BUSINESS_STATUS.SUCCESSTIP
		) {
			resolve(data);
		} else {
			reject(data);
		}
	}

	// 请求失败处理
	private _handleFailure(
		err: UniApp.GeneralCallbackResult,
		reject: (reason?: any) => void
	) {
		console.error("请求失败", err);
		const errorMsg = err.errMsg || "网络连接失败";
		uni.showToast({ icon: "none", title: errorMsg, duration: 2000 });
		reject(err);
	}

	// ---- 5. 错误处理，支持token自动刷新并重试 ----
	private async _handleRequestError(
		error: any,
		isRetry: boolean,
		originalOptions?: RequestOptions
	) {
		if (
			error.code === HTTP_STATUS.UNAUTHORIZED &&
			!isRetry &&
			originalOptions
		) {
			// 401自动刷新token与重试机制
			return await this._handleTokenExpired(originalOptions);
		}

		// 业务错误与HTTP提示
		if (error.code && error.code !== HTTP_STATUS.UNAUTHORIZED) {
			this.handleBusinessError(error);
		}
		if (error.code >= 400 && error.code < 600) {
			const httpError =
				{
					"400": "请求参数错误",
					"403": "拒绝访问",
					"404": "资源不存在",
					"500": "服务器错误",
					"502": "网关错误",
					"503": "服务不可用",
				}[String(error.code)] || "网络异常";
			uni.showToast({ icon: "none", title: httpError, duration: 2000 });
		}
	}

	// ---- 6. 刷新token并发控制与自动重试 ----
	private async _handleTokenExpired(originalOptions: RequestOptions) {
		if (this.refreshingPromise) {
			// 有正在刷新的Promise，等待完成，再重试原请求
			await this.refreshingPromise;
			// 自动重试（__isRetry避免死循环）
			return await this.request({ ...originalOptions, __isRetry: true });
		}

		const { refreshToken } = tokenUtil.get();
		const userStore = getUserStore();

		console.log("1  refreshToken >>>   ", refreshToken);

		if (!refreshToken) {
			this.handleLoginRedirect("登录已过期，请重新登录");
			return;
		}

		// 刷新token时，所有401请求等待
		this.refreshingPromise = (async () => {
			try {
				console.log("2  refreshToken >>>   ", refreshToken);
				const res = await userStore.refreshToken(refreshToken);
				if (res?.code == 0 && res.data?.accessToken) {
					tokenUtil.set({
						accessToken: res.data.accessToken,
						refreshToken: res.data.refreshToken,
					});
				} else {
					throw new Error("刷新凭证失败");
				}
			} catch (e) {
				tokenUtil.clear();
				this.handleLoginRedirect("登录已过期，请重新登录");
				throw e;
			} finally {
				this.refreshingPromise = null;
			}
		})();

		try {
			await this.refreshingPromise;
			// 刷新成功，原请求自动重试
			return await this.request({ ...originalOptions, __isRetry: true });
		} catch (e) {
			// 刷新失败不再重试
		}
	}

	// ---- 7. 防多跳转登录页与多提示 ----
	private handleLoginRedirect(message = "请先登录") {
		if (this.isNavigatingToLogin) return;
		this.isNavigatingToLogin = true;
		uni.showToast({ icon: "none", title: message, duration: 2000 });
		// 注意：navigateTo可能会因多次触发警告，这里只保留一次
		setTimeout(() => {
			uni.reLaunch({ url: "/pages/login/index" });
			this.isNavigatingToLogin = false;
		}, 500); // 延迟一点确保toast展示
	}

	// 便捷方法
	get<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
		return this.request<T>({ url, method: "GET", data, ...options });
	}

	post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
		return this.request<T>({ url, method: "POST", data, ...options });
	}

	put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
		return this.request<T>({ url, method: "PUT", data, ...options });
	}

	delete<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
		return this.request<T>({ url, method: "DELETE", data, ...options });
	}
}

export const http = new HttpRequest();
export default http;

```

###  及其完善

```js

import { HTTP_STATUS, BUSINESS_STATUS } from "@/common/constants/http";
import errorCode from "./errorCode";

type UserStoreType = any;

// 懒加载获取用户 store
const getUserStore = (): UserStoreType | undefined => {
    const app = getApp<{ $store?: { user: UserStoreType } }>();
    return app?.$store?.user;
};

interface RequestOptions extends UniApp.RequestOptions {
    loading?: boolean;
    auth?: boolean;
    debounceTime?: number;
    __isRetry?: boolean;
    skipTokenRefresh?: boolean; // 跳过 token 刷新
    allowDuplicate?: boolean; // 允许重复请求
}

interface BaseResponse<T = any> {
    code: number;
    data: T;
    msg?: string;
    status?: string;
}

// Token 处理工具函数
const tokenUtil = {
    get: (): { accessToken?: string; refreshToken?: string } =>
        uni.getStorageSync("token") || {},

    set: (tokenObj: { accessToken: string; refreshToken: string }) =>
        uni.setStorageSync("token", tokenObj),

    clear: () => uni.removeStorageSync("token"),
};

class HttpRequest {
    private pendingRequests = new Map<string, { cancel: Function }>();
    private loadingTimer: ReturnType<typeof setTimeout> | null = null;
    private loadingCount = 0;
    private refreshingPromise: Promise<any> | null = null;
    private isNavigatingToLogin = false;
    private toastQueue: string[] = []; // 防止 toast 重复

    // 生成唯一请求Key
    private generateRequestKey(options: RequestOptions): string | null {
        const { url, method = "GET", data } = options;

        if (data === null || data === undefined) {
            return `${method}_${url}`;
        }

        if (
            (typeof ArrayBuffer !== "undefined" && data instanceof ArrayBuffer) ||
            typeof data === "function" ||
            typeof data === "symbol"
        ) {
            return null;
        }

        try {
            const dataString =
                typeof data === "object"
                    ? JSON.stringify(data, Object.keys(data).sort())
                    : data;
            return `${method}_${url}_${dataString}`;
        } catch (e) {
            return null;
        }
    }

    // 请求去重管理
    private addPendingRequest(requestKey: string | null, cancelFn: Function) {
        if (requestKey) this.pendingRequests.set(requestKey, { cancel: cancelFn });
    }
    
    private removePendingRequest(requestKey: string | null) {
        if (requestKey) this.pendingRequests.delete(requestKey);
    }
    
    private cancelPendingRequest(requestKey: string | null) {
        if (!requestKey) return;
        const req = this.pendingRequests.get(requestKey);
        req?.cancel();
        this.pendingRequests.delete(requestKey);
    }

    // 显示 Loading
    private showLoading(debounceTime = 300) {
        this.loadingCount++;

        if (this.loadingTimer) {
            clearTimeout(this.loadingTimer);
            this.loadingTimer = null;
        }

        if (this.loadingCount === 1) {
            this.loadingTimer = setTimeout(() => {
                if (this.loadingCount > 0) {
                    uni.showLoading({ title: "加载中...", mask: true });
                }
            }, debounceTime);
        }
    }

    // 隐藏 Loading
    private hideLoading() {
        this.loadingCount = Math.max(0, this.loadingCount - 1);

        if (this.loadingCount === 0) {
            if (this.loadingTimer) {
                clearTimeout(this.loadingTimer);
                this.loadingTimer = null;
            }
            uni.hideLoading();
        }
    }

    // 显示 Toast（防重复）
    private showToast(message: string, duration = 2000) {
        if (this.toastQueue.includes(message)) return;
        
        this.toastQueue.push(message);
        uni.showToast({ icon: "none", title: message, duration });
        
        setTimeout(() => {
            const index = this.toastQueue.indexOf(message);
            if (index > -1) this.toastQueue.splice(index, 1);
        }, duration);
    }

    // 处理业务错误
    private async handleBusinessError(error: any) {
        const userStore = getUserStore();

        if (
            [BUSINESS_STATUS.TOKEN_EXPIRED, BUSINESS_STATUS.INVALID_TOKEN].includes(
                error.code
            )
        ) {
            userStore?.logout?.();
            uni.reLaunch({ url: "/pages/login/index" });
        } else {
            const msg = error.msg || errorCode[error.code] || "操作失败";
            this.showToast(msg);
        }
    }

    // 脱敏打印请求头
    private _maskSensitiveInfo(
        headers: Record<string, string> | undefined
    ): Record<string, string> {
        if (!headers) return {};
        const masked = { ...headers };
        if (masked.Authorization) {
            masked.Authorization = masked.Authorization.slice(0, 10) + "*****";
        }
        return masked;
    }

    // 序列化数据
    private _stringifyData(data: any, maxLen = 500): string {
        if (data == null) return "null";
        if (typeof ArrayBuffer !== "undefined" && data instanceof ArrayBuffer)
            return `[ArrayBuffer ${data.byteLength} bytes]`;
        if (typeof data === "object") {
            try {
                const str = JSON.stringify(data);
                if (str.length > maxLen) return str.slice(0, maxLen) + "...";
                return str;
            } catch {
                return "[Unstringifiable Object]";
            }
        }
        return String(data);
    }

    // 核心请求方法
    async request<T = any>(options: RequestOptions): Promise<BaseResponse<T>> {
        const {
            loading = true,
            auth = true,
            debounceTime = 300,
            __isRetry = false,
            skipTokenRefresh = false,
            allowDuplicate = false,
            ...requestOptions
        } = options;

        const requestKey = this.generateRequestKey(options);

        // 处理请求去重
        if (!__isRetry && !allowDuplicate && requestKey) {
            this.cancelPendingRequest(requestKey);
        }

        if (loading) this.showLoading(debounceTime);

        try {
            return await this._sendRequest<T>(
                requestOptions,
                requestKey,
                auth,
                __isRetry,
                skipTokenRefresh,
                allowDuplicate,
                options
            );
        } catch (error: any) {
            await this._handleRequestError(error, __isRetry, skipTokenRefresh, options);
            throw error;
        } finally {
            if (loading) this.hideLoading();
            if (!__isRetry && !allowDuplicate && requestKey) {
                this.removePendingRequest(requestKey);
            }
        }
    }

    // 发送请求实现
    private async _sendRequest<T>(
        options: RequestOptions,
        requestKey: string | null,
        auth: boolean,
        isRetry: boolean,
        skipTokenRefresh: boolean,
        allowDuplicate: boolean,
        originalOptions: RequestOptions
    ): Promise<BaseResponse<T>> {
        const requestStartTime = Date.now(); // 记录请求开始时间

        return new Promise((resolve, reject) => {
            const header: Record<string, string> = { ...options.header };
            const { accessToken } = tokenUtil.get();

            // 认证处理
            if (auth) {
                if (!accessToken) {
                    this.handleLoginRedirect("请先登录");
                    return reject({ code: HTTP_STATUS.UNAUTHORIZED, msg: "请先登录" });
                }
                header.Authorization = `${accessToken}`;
            }

            const baseURL = import.meta.env.VITE_QD_BASE_URL || "";
            const fullURL = baseURL ? baseURL + options.url : options.url;

            console.log(
                `[请求] 开始: ${options.method} ${options.url} 
                数据: ${this._stringifyData(options.data)} 
                请求头: ${JSON.stringify(this._maskSensitiveInfo(header))} 
                重试: ${isRetry ? "是" : "否"}`
            );

            const task = uni.request({
                ...options,
                url: fullURL,
                header,
                timeout: Number(import.meta.env.VITE_APP_REQUEST_TIMEOUT) || 60000,
                success: res => {
                    const endTime = Date.now();
                    console.log(
                        `[响应] 成功: 方法: ${options.method} URL: ${fullURL}
                        状态码: ${res.statusCode}
                        耗时: ${endTime - requestStartTime}ms
                        数据: ${this._stringifyData(res.data)}`
                    );
                    this._handleSuccess(res, resolve, reject);
                },
                fail: err => {
                    const endTime = Date.now();
                    console.log(
                        `[响应] 失败: 方法: ${options.method} URL: ${fullURL}
                        错误: ${JSON.stringify(err)}
                        耗时: ${endTime - requestStartTime}ms`
                    );
                    this._handleFailure(err, reject);
                },
            });

            if (!isRetry && !allowDuplicate && requestKey) {
                this.addPendingRequest(requestKey, () => task.abort());
            }
        });
    }

    // 请求成功处理
    private _handleSuccess<T>(
        res: UniApp.RequestSuccessCallbackResult,
        resolve: (value: BaseResponse<T>) => void,
        reject: (reason?: any) => void
    ) {
        const { statusCode, data } = res;

        if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
            reject({ code: statusCode, data });
        } else if (
            data?.code === BUSINESS_STATUS.SUCCESSCODE ||
            data?.status === BUSINESS_STATUS.SUCCESSTIP
        ) {
            resolve(data);
        } else {
            reject(data);
        }
    }

    // 请求失败处理
    private _handleFailure(
        err: UniApp.GeneralCallbackResult,
        reject: (reason?: any) => void
    ) {
        console.error("请求失败", err);
        const errorMsg = err.errMsg || "网络连接失败";
        this.showToast(errorMsg);
        reject(err);
    }

    // 错误处理
    private async _handleRequestError(
        error: any,
        isRetry: boolean,
        skipTokenRefresh: boolean,
        originalOptions?: RequestOptions
    ) {
        // 401 自动刷新 token
        if (
            error.code === HTTP_STATUS.UNAUTHORIZED &&
            !isRetry &&
            !skipTokenRefresh &&
            originalOptions
        ) {
            return await this._handleTokenExpired(originalOptions);
        }

        // 业务错误处理
        if (error.code && error.code !== HTTP_STATUS.UNAUTHORIZED) {
            this.handleBusinessError(error);
        }

        // HTTP 错误提示
        if (error.code >= 400 && error.code < 600) {
            const httpError =
                {
                    "400": "请求参数错误",
                    "403": "拒绝访问",
                    "404": "资源不存在",
                    "500": "服务器错误",
                    "502": "网关错误",
                    "503": "服务不可用",
                }[String(error.code)] || "网络异常";
            this.showToast(httpError);
        }
    }

    // Token 刷新处理
    private async _handleTokenExpired(originalOptions: RequestOptions) {
        if (this.refreshingPromise) {
            await this.refreshingPromise;
            return await this.request({ ...originalOptions, __isRetry: true });
        }

        const { refreshToken } = tokenUtil.get();
        const userStore = getUserStore();

        if (!refreshToken) {
            this.handleLoginRedirect("登录已过期，请重新登录");
            return;
        }

        this.refreshingPromise = (async () => {
            try {
                // 刷新 token 的请求应该跳过 401 重试
                const res = await this.post("/auth/refresh", 
                    { refreshToken }, 
                    { auth: false, skipTokenRefresh: true }
                );
                
                if (res?.code === 0 && res.data?.accessToken) {
                    tokenUtil.set({
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    });
                } else {
                    throw new Error("刷新凭证失败");
                }
            } catch (e) {
                tokenUtil.clear();
                this.handleLoginRedirect("登录已过期，请重新登录");
                throw e;
            } finally {
                this.refreshingPromise = null;
            }
        })();

        try {
            await this.refreshingPromise;
            return await this.request({ ...originalOptions, __isRetry: true });
        } catch (e) {
            // 刷新失败不再重试
        }
    }

    // 防止多次跳转登录页
    private handleLoginRedirect(message = "请先登录") {
        if (this.isNavigatingToLogin) return;
        this.isNavigatingToLogin = true;
        this.showToast(message);
        
        setTimeout(() => {
            uni.reLaunch({ url: "/pages/login/index" });
            this.isNavigatingToLogin = false;
        }, 500);
    }

    // 便捷方法
    get<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
        return this.request<T>({ url, method: "GET", data, ...options });
    }

    post<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
        return this.request<T>({ url, method: "POST", data, ...options });
    }

    put<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
        return this.request<T>({ url, method: "PUT", data, ...options });
    }

    delete<T = any>(url: string, data?: any, options?: Partial<RequestOptions>) {
        return this.request<T>({ url, method: "DELETE", data, ...options });
    }

    // 上传文件
    uploadFile(url: string, filePath: string, options?: Partial<UniApp.UploadFileOption>) {
        return new Promise((resolve, reject) => {
            const { accessToken } = tokenUtil.get();
            const baseURL = import.meta.env.VITE_QD_BASE_URL || "";
            const fullURL = baseURL ? baseURL + url : url;

            uni.uploadFile({
                url: fullURL,
                filePath,
                name: "file",
                header: {
                    Authorization: accessToken ? `${accessToken}` : "",
                    ...options?.header,
                },
                ...options,
                success: (res) => {
                    try {
                        const data = JSON.parse(res.data);
                        if (data.code === BUSINESS_STATUS.SUCCESSCODE) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    } catch (e) {
                        reject({ code: -1, msg: "响应解析失败" });
                    }
                },
                fail: reject,
            });
        });
    }
}

export const http = new HttpRequest();
export default http;

```





