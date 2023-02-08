import Child from "./Child";
import { HMO } from "./Enum";
export default class User {
    
    constructor(public FirstName: string, public LastName: string, public IdentityNumber: string, public BornDate: Date, public GenderId: number, public HMO: HMO, public Children: Child[] = null) {

    }
}