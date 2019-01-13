export interface Serializable<Type,InputType, OutputType> {
    deserialize(input: InputType): Type;
    serialize(): OutputType;
}
