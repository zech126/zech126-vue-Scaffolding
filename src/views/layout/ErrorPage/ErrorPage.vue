<template>
  <div class="exception">
    <div class="imgBlock">
      <div
        :style="`backgroundImage:url(${img || errorType.img})`"
        class="imgEle"
      />
    </div>
    <div class="content">
      <h1>{{ title || errorType.title }}</h1>
      <div class="desc">{{ desc || errorType.desc }}</div>
      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',

  props: {
    type: { type: [Number, String], default: '' },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    img: { type: String, default: '' }
  },

  data() {
    return {
      errorTypeConfig: {
        403: {
          img: require('./assets/403.svg'),
          title: '403',
          desc: '抱歉，你无权访问该页面'
        },
        404: {
          img: require('./assets/404.svg'),
          title: '404',
          desc: '抱歉，你访问的页面不存在'
        },
        500: {
          img: require('./assets/500.svg'),
          title: '500',
          desc: '抱歉，服务器出错了'
        }
      }
    }
  },

  computed: {
    errorType() {
      return (
        this.errorTypeConfig[this.type.toString()] ||
        this.errorTypeConfig['403']
      )
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/views/style/variables.less');

.exception {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 600px;

  .imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    zoom: 1;
    &::before,
    &::after {
      display: table;
      content: ' ';
    }
    &::after {
      height: 0;
      clear: both;
      font-size: 0;
      visibility: hidden;
    }
  }

  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: auto;

    h1 {
      margin-bottom: 24px;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      color: #434e59;
    }

    .desc {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
      color: #8c8c8c;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }

      .button {
        padding: 12px 20px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        background-color: @color-primary;
        border: 1px solid @color-primary;
        border-radius: 4px;

        &:hover {
          color: #fff;
          background: @color-primary-light-2;
          border-color: @color-primary-light-2;
        }
      }
    }
  }
}

@media screen and (max-width: @screen-xl) {
  .exception {
    .imgBlock {
      padding-right: 88px;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .exception {
    display: block;
    text-align: center;
    .imgBlock {
      padding-right: 0;
      margin: 0 auto 24px;
    }
  }
}

@media screen and (max-width: @screen-xs) {
  .exception {
    .imgBlock {
      margin-bottom: -24px;
      overflow: hidden;
    }
  }
}
</style>
