import {Injectable} from "@angular/core";
export class IRating {
    id?: number = -1;
    comment: string = '';
    rating: number = 1;
    user?: string = '';

    constructor(id:number, comment:string, rating:number, user:string) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.user = user;
    }
}

export class Lecture {
    id: number = -1;
    name: string = '';
    description: string = '';
    collapsed: boolean = true;
    rating: IRating [] = [];

    constructor(id:number, name:string, description:string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

@Injectable()
export class LecturesStore {
    lectures: Lecture[];

    constructor() {
        this.lectures = [];
    }

    addLecture(id: number, name: string, description: string) : Lecture {
        let lecture = new Lecture(id, name, description);
        this.lectures.push(lecture);
        return lecture;
    }

    addRating(lecture: Lecture, rating: IRating) {
        const index = this.lectures.indexOf(lecture);
        this.lectures[index].rating.push(rating);
    }

}