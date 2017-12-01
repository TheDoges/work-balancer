export interface Serializable<T> {
    deserialize(input: any): T;
    serialize(): Object;
}
