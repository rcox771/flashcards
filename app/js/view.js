qs = [['AR for Army Retention Program?', 'AR 601-280'],
      ['FM for Physical Fitness?', 'FM 7-22'],
      ['AR for Awards and Decorations?', 'AR 600-8-22'],
      ['FM for Communications?', 'FM 24-18'],
      ['FM for Field Hygiene and Sanitation?', 'FM 21-10'],
      ['AR for Security and Intelligence?', 'AR 380-5'],
      ['AR for SHARP?', 'AR 600-20 CH 7&8'],
      ['TC for NCO Duties and Responsibilities?', 'TC 7-22.7'],
      ['AR for EO?', 'AR 600-20'],
      ['AR for SFL-TAP?', 'AR 600-80'],
      ['FM for FST?', 'FM 4-25.12'],
      ['FM for D and C?', 'FM 3-21.5'],
      ['AR for Military Justice?', 'AR 27-10'],
      ['FM for Land Nav?', 'FM 3-25.26'],
      ['AR for Promotions and Reductions?', 'AR 600-8-19'],
      ['FM for Operational Terms and Graphics?', 'FM 1-02'],
      ['AR for ASAP?', 'AR 600-85'],
      ['ADP covers Leadership?', 'ADP 6-22'],
      ['AR for Suspension of Favorable Personnel Actions?', 'AR 600-8-2'],
      ['AR for Body Composition?', 'AR 600-9'],
      ['FM for Counseling?', 'FM 6-22 Appendix B'],
      ['AR for Army Physical Security Program?', 'AR 190-13'],
      ['FM for BRM?', 'FM 3-22.9'],
      ['FM for Battle Focused Training?', 'FM 7-1'],
      ['AR for NCOERS AND OERS?', 'AR 623-3'],
      ['AR for Leaves and Passes?', 'AR 600-8-10'],
      ['FM for Physical Security?', 'FM 3-19.30'],
      ['FM for First Aid?', 'FM 4-25.11']];


compliments = [
    "kick ass",
    "best Soldier everrrr",
    "keep it up",
    "woo",
    "yeah boiiii",
    "something motivational here"
]


function Card(q,a){
    this.q = q;
    this.a = a;
    this.isCorrect = function(){
        if(vm.lastquestion()==this.q){
            return "correct"
        } else {
            return "incorrect"
        }
    };

    this.checkAnswer = function(){
        if(vm.lastquestion()==this.q){
            console.log('got it right');

            vm.removeFromDeck(this);

        } else {
            console.log('wrong');
        }
    }

}




function Deck(){

    this.cards = ko.observableArray(_.map(qs, function(qa){
        return new Card(qa[0], qa[1])
    }));


    this.last_compliment = ko.observable("");

    this.complimentRoll = function(){
        var chosen = _.random(0, compliments.length)
        if(compliments[chosen]!=this.last_compliment){
            if(Math.random()>.6){
                Materialize.toast(compliments[chosen], 4000);
                this.last_compliment(compliments[chosen]);
            }
        }
    }

    this.lastquestion = ko.observable("");

    this.testUser = function(){
        //pick a random card
        if(1<this.cards().length){
            var chosen = _.random(0,this.cards().length);
            this.lastquestion(this.cards()[chosen].q);

        } else {
            if(this.cards().length==1){
                var chosen = 0;
                this.lastquestion(this.cards()[0].q);
            } else {
                this.lastquestion("No questions left");
            }
        }

    }

    this.removeFromDeck = function(card){
        this.cards.remove(card);
        this.complimentRoll();
        this.testUser();
    }

    this.score = ko.observable(0);

    this.testUser();

}




