/**
 * @author 吴光富
 * @description
 *   数据流处理适配器
 * @example
 *
 */

export default function adaptor(data) {
  let handler =  {
    pipe(cb, ...args) {
      data = cb.call(null, data, ...args);
      return handler;
    },
    end() {
      return data;
    }
  }

  return handler;
}
