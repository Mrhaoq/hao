## 校验方法 

```js
export default {
	/**
	 * 校验统一社会信用代码
	 * @param creditCode 18位统一社会信用代码字符串
	 * @returns boolean 验证通过返回true，否则返回false
	 */
	isSocialCreditCode: (creditCode: string): boolean => {
		// 去除不可见占位字符串
		creditCode = creditCode.replace(/[^\x20-\x7E]/g, "");
		console.info(creditCode.length);
		//18位校验及数字字母组合校验
		if (creditCode.length == 18) return /^[A-Za-z0-9]+$/.test(creditCode);
		return false;

		// console.log("传入信用代码  >>>  ", creditCode);
		// // 字符转换映射表
		// const charToNum: Record<string, number> = {
		// 	"0": 0,
		// 	"1": 1,
		// 	"2": 2,
		// 	"3": 3,
		// 	"4": 4,
		// 	"5": 5,
		// 	"6": 6,
		// 	"7": 7,
		// 	"8": 8,
		// 	"9": 9,
		// 	A: 10,
		// 	B: 11,
		// 	C: 12,
		// 	D: 13,
		// 	E: 14,
		// 	F: 15,
		// 	G: 16,
		// 	H: 17,
		// 	I: 18,
		// 	J: 19,
		// 	K: 20,
		// 	L: 21,
		// 	M: 22,
		// 	N: 23,
		// 	O: 24,
		// 	P: 25,
		// 	Q: 26,
		// 	R: 27,
		// 	S: 28,
		// 	T: 29,
		// 	U: 30,
		// 	V: 31,
		// 	W: 32,
		// 	X: 33,
		// 	Y: 34,
		// 	Z: 35,
		// };

		// // 加权因子
		// const weights: number[] = [
		// 	1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28,
		// ];

		// try {
		// 	// 基础验证
		// 	if (!creditCode || creditCode.length !== 18) {
		// 		return false;
		// 	}

		// 	// 转换为大写
		// 	const code = creditCode.toUpperCase();

		// 	// 计算校验码
		// 	let total = 0;
		// 	for (let i = 0; i < 17; i++) {
		// 		const char = code[i];
		// 		// 判断字符是否在转换字典中
		// 		if (!(char in charToNum)) {
		// 			return false;
		// 		}
		// 		total += charToNum[char] * weights[i];
		// 	}

		// 	// 计算校验位
		// 	let checkDigit = 31 - (total % 31);
		// 	if (checkDigit === 31) {
		// 		checkDigit = 0;
		// 	}

		// 	// 校验位对应的字符
		// 	const checkChar = "0123456789ABCDEFGHJKLMNPQRTUWXY"[checkDigit];

		// 	// 比较校验位
		// 	return checkChar === code[17];
		// } catch (error) {
		// 	return false;
		// }
	},
	isIdCode: (value: string, msg: string = "身份证号格式不正确") => {
		const p =
			/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
		const valid = p.test(value);

		if (!valid) {
			return {
				valid: valid,
				message: msg,
			};
		}
		return { valid: valid };
	},
	/**
	 *
	 * @param value - 手机号
	 * @param msg - 错误提示信息
	 * @returns
	 */
	isPhone: (value: string, msg: string = "手机号格式不正确") => {
		const reg =
			/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

		const valid = reg.test(value);

		if (!valid) {
			return {
				valid: valid,
				message: msg,
			};
		}
		return { valid: valid };
	},
	isValidLicensePlate: (plate: string): boolean => {
		if (!plate) return false;

		// 转大写并去除空格
		const value = plate.trim().toUpperCase();

		// 省份简称
		const provinces =
			"京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼";

		// 字母和数字组合
		const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
		const nums = "0123456789";
		const chars = `${letters}${nums}`;

		// 验证普通车牌、新能源车牌和特殊车牌
		const pattern = new RegExp(
			// 普通车牌
			`^([${provinces}][${letters}][${chars}]{4}[${chars}挂学警港澳])|` +
				// 新能源车牌
				`([${provinces}][${letters}][${chars}]{4}[DF][${chars}])|` +
				// 特殊车牌（军警等）
				`([WJ军][${provinces}]?[${chars}]{4,5})$`
		);

		return pattern.test(value);
	},
};
/**
 * 单个字段验证结果
 */
interface ValidateResult {
	valid: boolean;
	message?: string;
}

/**
 * 验证错误信息
 */
interface ValidationError {
	field: string;
	message: string;
	value?: any;
	error?: string;
}

/**
 * 整体验证结果
 */
interface ValidationResult {
	valid: boolean;
	errors: ValidationError[];
}

/**
 * 内置规则类型
 */
type BuiltInRuleType = "required" | "email" | "mobile" | "url" | "number";

/**
 * 验证器函数类型
 */
type ValidatorFn = (
	value: any,
	field: string
) => Promise<ValidateResult> | ValidateResult | boolean;

/**
 * 数组项验证规则接口
 */
interface ArrayItemRules {
	rules?: RuleConfig[]; // 针对数组元素的规则
	fields?: Record<string, RuleConfig[]>; // 针对数组中对象的字段规则
}

/**
 * 规则配置接口
 */
interface RuleConfig {
	type?: BuiltInRuleType;
	required?: boolean;
	pattern?: RegExp | string;
	min?: number;
	max?: number;
	message?: string;
	validator?: ValidatorFn;
	items?: ArrayItemRules; // 数组验证规则
}

/**
 * 内置规则接口
 */
interface BuiltInRule {
	validate: (value: any) => boolean;
	message: string;
}

/**
 * 规则映射类型
 */
type Rules<T> = {
	[P in keyof T]?: (RuleConfig | BuiltInRuleType)[];
};

/**
 * 校验规则解析器
 */
export class Validator<T extends Record<string, any>> {
	private builtInRules: Record<BuiltInRuleType, BuiltInRule>;

	constructor() {
		this.builtInRules = {
			required: {
				validate: function (value: any): boolean {
					if (Array.isArray(value)) {
						return value.length > 0;
					}
					return value !== null && value !== undefined && value !== "";
				},
				message: "该字段为必填项",
			},
			email: {
				validate: function (value: any): boolean {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
				},
				message: "请输入有效的邮箱地址",
			},
			mobile: {
				validate: function (value: any): boolean {
					return /^1[3-9]\d{9}$/.test(String(value));
				},
				message: "请输入有效的手机号码",
			},
			url: {
				validate: function (value: any): boolean {
					try {
						new URL(String(value));
						return true;
					} catch (error) {
						return false;
					}
				},
				message: "请输入有效的URL",
			},
			number: {
				validate: function (value: any): boolean {
					return !isNaN(value) && typeof value === "number";
				},
				message: "请输入有效的数字",
			},
		};
	}

	/**
	 * 验证方法
	 * @param obj 要验证的对象
	 * @param rules 验证规则
	 * @returns 验证结果
	 */
	async validate(obj: T, rules: Rules<T>): Promise<ValidationResult> {
		const errors: ValidationError[] = [];

		for (const path in rules) {
			if (Object.prototype.hasOwnProperty.call(rules, path)) {
				const fieldRules = rules[path];
				const value = this.getValueByPath(obj, path);

				if (fieldRules) {
					for (const rule of this.normalizeRules(fieldRules)) {
						try {
							// 处理数组验证
							if (Array.isArray(value) && rule.items) {
								const arrayErrors = await this.validateArray(
									value,
									rule.items,
									path
								);
								errors.push(...arrayErrors);
								continue;
							}

							const result = await this.validateField(value, rule, path);
							if (!result.valid) {
								errors.push({
									field: path,
									message: result.message || "验证失败",
									value: value,
								});
								break;
							}
						} catch (error) {
							errors.push({
								field: path,
								message: "校验过程发生错误",
								error: error instanceof Error ? error.message : String(error),
							});
						}
					}
				}
			}
		}

		return {
			valid: errors.length === 0,
			errors: errors,
		};
	}

	/**
	 * 规则标准化处理
	 */
	private normalizeRules(
		rules: (RuleConfig | BuiltInRuleType)[]
	): RuleConfig[] {
		return rules.map(function (rule) {
			if (typeof rule === "string") {
				return { type: rule };
			}
			return rule;
		});
	}

	/**
	 * 验证单个字段
	 */
	private async validateField(
		value: any,
		rule: RuleConfig,
		field: string
	): Promise<ValidateResult> {
		// 处理内置规则
		if (rule.type && this.builtInRules[rule.type]) {
			const builtInRule = this.builtInRules[rule.type];
			const valid = builtInRule.validate(value);
			return {
				valid: valid,
				message: valid ? "" : rule.message || builtInRule.message,
			};
		}

		// 处理必填规则
		if (rule.required) {
			const valid = this.builtInRules.required.validate(value);
			if (!valid) {
				return {
					valid: false,
					message: rule.message || this.builtInRules.required.message,
				};
			}
		}

		// 自定义验证函数
		if (rule.validator) {
			try {
				const result = await rule.validator(value, field);
				if (typeof result === "boolean") {
					return {
						valid: result,
						message: result ? "" : rule.message || "验证失败",
					};
				}
				return result;
			} catch (error) {
				throw new Error(
					"自定义验证器错误: " +
						(error instanceof Error ? error.message : String(error))
				);
			}
		}

		// 正则表达式验证
		if (rule.pattern) {
			const pattern =
				rule.pattern instanceof RegExp
					? rule.pattern
					: new RegExp(rule.pattern);
			const valid = pattern.test(String(value));
			return {
				valid: valid,
				message: valid ? "" : rule.message || "格式不匹配",
			};
		}

		// 范围验证
		if ("min" in rule || "max" in rule) {
			if (typeof value === "number") {
				const minValue = rule.min !== undefined ? rule.min : -Infinity;
				const maxValue = rule.max !== undefined ? rule.max : Infinity;
				const valid =
					(!("min" in rule) || value >= minValue) &&
					(!("max" in rule) || value <= maxValue);
				return {
					valid: valid,
					message: valid
						? ""
						: rule.message ||
						  "数值应在" +
								(rule.min !== undefined ? rule.min : "-∞") +
								"到" +
								(rule.max !== undefined ? rule.max : "∞") +
								"之间",
				};
			}
			if (typeof value === "string" || Array.isArray(value)) {
				const len = value.length;
				const minLen = rule.min !== undefined ? rule.min : 0;
				const maxLen = rule.max !== undefined ? rule.max : Infinity;
				const valid =
					(!("min" in rule) || len >= minLen) &&
					(!("max" in rule) || len <= maxLen);
				return {
					valid: valid,
					message: valid
						? ""
						: rule.message ||
						  "长度应在" +
								(rule.min !== undefined ? rule.min : "0") +
								"到" +
								(rule.max !== undefined ? rule.max : "∞") +
								"之间",
				};
			}
		}

		return { valid: true };
	}

	/**
	 * 验证数组
	 */
	private async validateArray(
		array: any[],
		itemsRule: ArrayItemRules | undefined,
		parentPath: string
	): Promise<ValidationError[]> {
		const errors: ValidationError[] = [];

		if (!itemsRule) {
			return errors;
		}

		for (let i = 0; i < array.length; i++) {
			const item = array[i];
			const itemPath = `${parentPath}[${i}]`;

			// 验证数组元素本身的规则
			if (itemsRule.rules && Array.isArray(itemsRule.rules)) {
				for (const rule of itemsRule.rules) {
					const result = await this.validateField(item, rule, itemPath);
					if (!result.valid) {
						errors.push({
							field: itemPath,
							message: result.message || "验证失败",
							value: item,
						});
						break;
					}
				}
			}

			// 验证数组元素中的对象字段
			if (itemsRule.fields && typeof item === "object" && item !== null) {
				for (const [fieldName, fieldRules] of Object.entries(
					itemsRule.fields
				)) {
					const fieldValue = item[fieldName];
					const fieldPath = `${itemPath}.${fieldName}`;

					if (Array.isArray(fieldRules)) {
						for (const rule of this.normalizeRules(fieldRules)) {
							const result = await this.validateField(
								fieldValue,
								rule,
								fieldPath
							);
							if (!result.valid) {
								errors.push({
									field: fieldPath,
									message: result.message || "验证失败",
									value: fieldValue,
								});
								break;
							}
						}
					}
				}
			}
		}

		return errors;
	}

	/**
	 * 获取对象路径值
	 */
	private getValueByPath(obj: T, path: string): any {
		return path.split(".").reduce(function (value, key) {
			return value && value[key];
		}, obj);
	}

	/**
	 * 添加内置规则
	 */
	addBuiltInRule(
		type: string,
		validate: (value: any) => boolean,
		message: string
	): void {
		(this.builtInRules as any)[type] = {
			validate: validate,
			message: message,
		};
	}
}

```



##  使用示例(注册页)

```js
<template>
  <qd-page :haveHeader="false">
    <qd-contentWrap>
      <qd-input
        v-model="form.agentName"
        label="姓名"
        placeholder="请输入姓名"
        required
      >
      </qd-input>

      <view class="divider"></view>

      <view class="info-item">
        <view class="info-item-title required"> 手机号码 </view>
        <view class="info-item-content">
          {{ form.phone }}
        </view>
      </view>

      <view class="divider"></view>

      <view class="flex-between" style="padding: 20rpx 0">
        <view class="flex">
          <view class="mr5">所在区域</view>
          <view style="color: red"> *</view>
        </view>
        <view class="flex" @click="showPicker = true">
          <view v-if="address" class="mr5">{{ address }}</view>
          <view v-else class="mr5">请选择所在区域</view>
          <view>
            <qd-icon icon="icon-under" size="30"></qd-icon>
          </view>
        </view>
      </view>
    </qd-contentWrap>

    <view class="mb15 agree-box">
      <u-checkbox
        :customStyle="{ marginBottom: '8px' }"
        name="agree"
        label="我阅读并同意铅蛋的"
        shape="circle"
        usedAlone
        v-model:checked="agreeChecked"
      >
      </u-checkbox>
      <view class="flex-align-center">
        <view style="color: #0081ff; font-weight: 900" @tap="goagreement">
          《用户服务协议》
        </view>
      </view>
    </view>

    <qd-button class="mt40" type="primary" block @click="submit" width="100%">
      确认登录
    </qd-button>

    <view v-if="showPicker">
      <qd-areaPick
        v-model="showPicker"
        :init-area="['110000', '110100', '110101']"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </view>
  </qd-page>
</template>

<script setup lang="ts">
import { agentRegister } from "@/api/agent/register";
import { useUserStore } from "@/store/modules/user";
import { reactive, ref } from "vue";
import validation, { Validator } from "@/utils/validation";
defineOptions({ name: "agent-register" });

const user = useUserStore();

const showPicker = ref(false);

interface UserData {
  agentName: string;
  phone: string;
  businessProvince: string;
  provinceName: string;
  cityName: string;
  districtName: string;
}

const validator = new Validator<UserData>();

const form: UserData = reactive({
  agentName: "",
  phone: "",
  businessProvince: "",
  provinceName: "",
  cityName: "",
  districtName: "",
});
const address = ref();

// 地区选择回调
const handleConfirm = (value: any) => {
  console.log("选择的地区:", value);
  const val = value.value;
  address.value = val[0].label + "," + val[1].label + "," + val[2].label;
  // 表单赋值
  form.businessProvince =
    val[0].value + "," + val[1].value + "," + val[2].value;
  form.provinceName = val[0].label;
  form.cityName = val[1].label;
  form.districtName = val[2].label;
  console.log("选择的地区:", form);
};

const handleCancel = () => {
  console.log("取消选择");
};
// 用户协议查看页面
const goagreement = () => my.navigateTo({ url: "/pages/agreement" });

const agreeChecked = ref(false);
// 回填手机号
const setPhone = () => {
  if (form) {
    form.phone = user.userInfo?.mobile || "";
  }
  console.log("form >>>", form);
};
setPhone();

const rules: any = {
  agentName: [{ required: true, message: "姓名不能为空" }],
  phone: [
    { required: true, message: "手机号不能为空" },
    {
      validator: (value: any) => validation.isPhone(value, "手机号格式不正确"),
    },
  ],
  businessProvince: [{ required: true, message: "所在区域不能为空" }],
};
// 注册提交
const submit = async () => {
  const result = await validator.validate(form, rules);
  console.log("验证结果", result);

  if (!result.valid) {
    my.showToast({
      content: result.errors[0].message,
    });
    return;
  }
  if (!agreeChecked.value) {
    my.showToast({
      content: "请阅读并同意用户服务协议",
    });
    return;
  }
  try {
    const r: any = await agentRegister(form);
    // 更新用户数据
    my.getAuthCode({
      scopes: "auth_base",
      success: async (res: any) => {
        const rz: any = await user.login(res.authCode);
      },
    });

    my.reLaunch({
      url: "/pages-agent/pages/user/recoveryArea?isRegister=true",
    });
  } catch (error: any) {
    console.log("error  >>> ", error);
    my.showToast({
      content: error.errorMsg,
    });
  } finally {
    uni.hideLoading();
  }
};
</script>

<style scoped lang="scss">
*{
  font-size: 32rpx;
}
.agree-box {
  display: flex;
}

.info-item {
  font-size: 32rpx;
  line-height: 54rpx;
  display: flex;
  justify-content: space-between;
  .info-item-title {
    color: #666666;
    min-width: 150rpx;
    margin-right: 30rpx;
  }
  .info-item-content {
    color: #2a2a2a;
    text-align: right;
  }
}
</style>

```











