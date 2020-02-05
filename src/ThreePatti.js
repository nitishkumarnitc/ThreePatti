class ThreePatti{
    constructor(deck,players) {
            this.deck=deck;
            this.playersCards={};
            this.players=players;
            this.winnerName='';
    }

    randomNumberGenerator(min,max){
        return 	Math.floor(Math.random() * (+max - +min)) + +min;
    }

    getCardAtAnIndexAndUpdateDeck(index){
        let card=this.deck[index];
        if(card.count===1){
            this.deck.splice(index,1)
        }
        else this.deck[index].count--;
        console.log("Card is ",card)
        return card;
    }

    assignCardToAPlayer(playerCards,cardCount) {
        for (let i = 0; i < cardCount && this.deck.length>0; i++) {
            let length = this.deck.length;
            playerCards.push(this.getCardAtAnIndexAndUpdateDeck(this.randomNumberGenerator(0, length)))
        }
    }


    distributeCardsToAllPlayersInTheGame(numberOfCards){
        this.players.forEach(player=>{
            if(!this.playersCards[player]){
                this.playersCards[player]=[];
            }
            this.assignCardToAPlayer(this.playersCards[player],numberOfCards)
        })

    }

    isThreePattiAndCardValue(cards){
        return (cards[0].value===cards[1].value && cards[1].value===cards[2].value) && cards[0].value
    }

    winnersNameByCallBackFunction(callBack){
        let maxValue=0;
        let winnersName=[];
        this.players.forEach(player=>{
            let cards=this.playersCards[player];
            let value=callBack(cards);
            if(value){
                if(value>maxValue){
                    maxValue=value;
                    winnersName=[];
                    winnersName.push(player)
                }else if(value===maxValue){
                    winnersName.push(player)
                }
            }
        });
        return winnersName;
    }

    isSequenceAndMaxValue(cards){
        cards.sort((a,b)=> {
           return a.value-b.value;
        });
       return cards[0].value===cards[1].value-1  && cards[1].value===cards[2].value-1 && cards[2].value;
    }


    isPairAndPairValue(cards){
        let pairValue=false;

        if(cards[0].value===cards[1].value){
            pairValue=cards[0].value
        }
        else if(cards[1].value===cards[2].value){
            pairValue=cards[1].value
        }
        else if(cards[0].value===cards[2].value){
            pairValue=cards[0].value
        }
        return pairValue;
    }


    getTopCardOfAPlayer(cards){
        let topCard=cards[0];
        cards.forEach(card=>{
            if(card.value>topCard.value) topCard=card
        });
        return topCard.value;
    }

    getLastCardOfAPlayers(cards){
        return cards.pop().value;
    }

    checkWinner() {
        let callbacks=[this.isThreePattiAndCardValue, this.isSequenceAndMaxValue, this.isPairAndPairValue, this.getTopCardOfAPlayer];
        callbacks.every(callback=>{
            let winnersName=this.winnersNameByCallBackFunction(callback);
            if(winnersName.length===1){
                this.winnerName=winnersName[0];
                return false;
            } else {
                return true;
            }
        });


        if(!this.winnerName){
            this.players=this.winnersNameByCallBackFunction(this.getTopCardOfAPlayer);
            while(!this.winnerName && this.deck.length>0){
                this.distributeCardsToAllPlayersInTheGame(1);
                this.players=this.winnersNameByCallBackFunction(this.getLastCardOfAPlayers);
                if(this.players.length===1){
                    this.winnerName=this.players[0];
                }
            }
        }

        if(this.winnerName) {
            console.log("Winner is : ",this.winnerName);
        }
        else {
            console.log(" no winner, deck ",this.deck)
        }
    }


}

module.exports=ThreePatti;