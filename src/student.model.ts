export class StudentModel {
    ItemId: string
    Name: string 
    Marks: number
    constructor (ItemId: string, Name: string, Marks: number){
        this.ItemId = ItemId;
        this.Name = Name;
        this.Marks = Marks;
    } 
}