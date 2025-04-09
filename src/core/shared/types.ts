// 将联合类型转换为交叉类型的工具类型
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// 提取函数参数类型的工具类型
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any
  ? P
  : never;

// 提取函数返回值类型的工具类型
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R
  ? R
  : any;

// 使类型中的所有属性都变为可选的工具类型
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 使类型中的所有属性都变为只读的工具类型
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// 从类型中选择一组属性的工具类型
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 从类型中排除一组属性的工具类型
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 提取两个类型的不同属性的工具类型
export type Diff<T, U> = T extends U ? never : T;

// 提取两个类型的相同属性的工具类型
export type Filter<T, U> = T extends U ? T : never;

export type Exact<T> = {
  [K in keyof T]: T[K];
};
