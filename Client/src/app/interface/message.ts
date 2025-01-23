export interface Message{
    _id: String,
    title :String,
    note :String,
    createdDate :Date,
    updatedDate :Date,
    deadLine: String,
    taskStatus: String
}
export interface User{
    _id: String,
    name :String,
    email :String
}
