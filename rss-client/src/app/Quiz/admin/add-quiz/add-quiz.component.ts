import { QuizService } from 'src/app/services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  view = 'select';
  subjects;

  focusedQuiz = {
    quizId: 0,
    subject: null,
    quizTopic: null,
    quizDescription: null,
    subjectId: 0,
    creatorEmail: this.userservice.user.email,
    questions: [],
    availablePoints: null,
  };
  focusedQuestion;
  addSubject(event) {
    delete event.value.subjectId;
    this.quizService.addSubject(event.value).subscribe();
    this.quizService.getAllSubjects().subscribe((res) => (this.subjects = res));
  }
  setSubject(event) {
    this.focusedQuiz.subject = event;
    this.updateTotal();
    this.view = event;
  }
  reducer = (accumulator, currentValue) =>
    accumulator + currentValue.questionValue;
  updateTotal() {
    let total = this.focusedQuiz.questions.reduce(this.reducer, 0);
    this.focusedQuiz.availablePoints = total || 0;
  }

  onBack() {
    this.view = 'select';
  }
  submitChanges() {
    //TODO: save focused quiz to the database
    console.log(this.focusedQuiz);
    this.focusedQuiz.subjectId = this.focusedQuiz.subject.subjectId;
    this.quizService.addQuiz(this.focusedQuiz).subscribe((res) => {
      this.focusedQuiz.quizId = res.quizId;
      console.log(this.focusedQuiz.quizId);
      this.focusedQuiz.questions.forEach((x) => {
        x.quizId = this.focusedQuiz.quizId;
      });
      this.quizService.addManyQuestions(this.focusedQuiz.questions).subscribe();
    });
  }
  closeResult = '';
  open(content, question) {
    if (question == 'new') {
      this.focusedQuestion = {
        question: null,
        quizId: this.focusedQuiz.quizId,
        questionValue: null,
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        option5: null,
        quiz: {
          creatorEmail: this.userservice.user.email,
        },
      };
    } else {
      this.focusedQuestion = question;
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // when modal is manually closed, it sends a type and value.
          if (result.type == 'update') {
            //TODO:update question in Database
            // Addstuff here to change what each question contains
            let newQuestion = {
              questionId: this.focusedQuestion.questionId,
              question: result.value.question,
              questionValue: result.value.questionValue,
              correctAnswer: result.value.correctAnswer,
            };
            // Adds only options with not null values
            let i = 1;
            for (let [key, value] of Object.entries(result.value)) {
              if (key[0] == 'o') {
                if (value != null) {
                  let thisOption = 'option' + i;
                  newQuestion[thisOption] = value;
                  i++;
                }
              }
            }
            // Searches question array to see if this question exists
            console.log(newQuestion);
            let index = this.focusedQuiz.questions.indexOf(
              this.focusedQuestion
            );
            // if it doesn't exist, push it to the end of the quesion array
            if (index == -1) {
              this.focusedQuiz.questions.push(newQuestion);
            } else {
              // if it does exists, update the question
              this.focusedQuiz.questions[index] = newQuestion;
            }
            // updates the total points available in this quiz
            this.updateTotal();
          } else if (result.type == 'delete') {
            //TODO:remove question from database here
            this.focusedQuiz.questions = this.focusedQuiz.questions.filter(
              (x) => x.questionId != result.value.questionId
            );
            this.updateTotal();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(
    private modalService: NgbModal,
    private quizService: QuizService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.quizService.getAllSubjects().subscribe((res) => (this.subjects = res));
  }
}
