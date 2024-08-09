type CamelToKebabCase<S extends string> = S extends `${infer P1}${infer P2}`
  ? P2 extends Uncapitalize<P2>
    ? `${Lowercase<P1>}${CamelToKebabCase<P2>}`
    : `${Lowercase<P1>}-${CamelToKebabCase<P2>}`
  : S;

type PascalToKebabCase<S> = S extends string
  ? CamelToKebabCase<Uncapitalize<S>>
  : S;

export default PascalToKebabCase;
