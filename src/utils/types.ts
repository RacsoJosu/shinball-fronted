export type LoaderDataType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
