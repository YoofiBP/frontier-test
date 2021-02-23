
export interface iApplicationModel {
    fullname:string
    lastname:string
    phoneno:string
    email:string
    location:string
    linkedin:string
    resume:string
}

export const ApplicationModel:Readonly<iApplicationModel> = {
    fullname: "string",
    lastname: "string",
    phoneno: "string",
    email: "string",
    location: "string",
    linkedin: "string",
    resume: "string"
}