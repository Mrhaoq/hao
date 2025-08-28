```js
<template>
  <div class="home" v-loading="loading">
    <li class="home-title">查看采购单</li>
    <div class="header block mb20">
      <div>
        <div>
          订单状态：
          <span style="color: #3774f7">
            {{ data.status }}
          </span>
        </div>

        <el-button class="reset-btn" @click="$router.go(-1)">返回</el-button>
      </div>

      <el-row :gutter="20" class="mb15">
        <el-col :span="6"> 订单编号：{{ data.id }} </el-col>

        <el-col :span="6" v-if="data.status == 1 && data.payType">
          支付方式：{{ payTypeObj[data.payType] }}
        </el-col>

        <el-col :span="6" v-if="data.status != 0 && data.payType == 4">
          完成时间：{{ data.completeTime }}
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mb15">
        <el-col :span="6">送货运力：{{ data.agentName || "-" }}</el-col>
        <el-col :span="6"> 运力电话：{{ data.agentPhone || "-" }} </el-col>
      </el-row>

      <el-row :gutter="20" class="mb15">
        <el-col :span="6">
          订单总重量：
          {{ fmtNumFloor(data.weight / 1000, 3) }} 吨
        </el-col>

        <template v-if="data.status != 2 && invoiceFlag && data.isInvoice">
          <el-col :span="6">
            货款押金：{{ fmtNumFloor(data.matchAmount + data.remainAmount, 2) }}
          </el-col>

          <el-col :span="6">
            自营货款：{{ fmtNumFloor(data.matchAmount + data.remainAmount, 2) }}
          </el-col>

          <el-col :span="6" v-if="data.transportAmount > 0">
            转运服务费：{{ fmtNumFloor(data.transportAmount, 2) }}
          </el-col>
        </template>

        <template v-else>
          <el-col :span="6">
            订单总金额：
            {{ fmtNumFloor(data.amount, 2) }}
          </el-col>
        </template>
      </el-row>

      <template>
        <el-divider></el-divider>

        <el-steps :active="active" align-center style="margin-top: 20px">
          <el-step
            title="发起采购单"
            :description="data.createOn"
            icon="el-icon-success"
          >
          </el-step>

          <el-step
            :title="
              data.status == 2
                ? '已取消'
                : data.payType == 4
                ? '已入库'
                : '支付金额并完成'
            "
            :description="
              data.cancelTime || data.payTime || data.completeTime || '-'
            "
            icon="el-icon-success"
          >
          </el-step>
        </el-steps>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PODetail",
  data() {
    return {
      loading: false,

      data: {},

      orderInfoList: [],
    };
  },

  methods: {
    // 获取详情
    async getDetail() {
      const res = await this.$handleApiCall(procurementDetail, { id: this.id });
      if (res.code != 200) return;
      this.data = res.content;

    },
  },
};
</script>

```























