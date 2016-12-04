import {Injectable} from "@angular/core";
import Immutable from 'immutable';

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
    lectures;

    constructor() {
        this.lectures = Immutable.List<Lecture>();
    }

    reset() {
        this.lectures = Immutable.List<Lecture>();
    }

    addLecture(id: number, name: string, description: string) : Lecture {
        let lecture = new Lecture(id, name, description);
        this.lectures = this.lectures.push(lecture);
        return lecture;
    }

    addRating(lecture: Lecture, rating: IRating) {
        const index = this.lectures.indexOf(lecture);
        this.lectures = (<any>this.lectures).update(index, (lecture) => {
            let ratings: IRating[] = [];
            lecture.rating.forEach(oldRating => ratings.push(oldRating));
            ratings.push(rating);

            return {
                id: lecture.id,
                name: lecture.name,
                description: lecture.description,
                rating: ratings
            };

        });
    }
}