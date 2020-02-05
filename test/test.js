'use strict'

const  Game=require('./../src/ThreePatti');
const {Deck,Card}=require("./../src/Deck");

const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect ;

const players=["Nitish","SoCash","Ram","Rahim"]

describe('the game',()=>{

    //Game Initialization
    describe('init game',()=>{
        let game;
        beforeEach(()=>{
            game=new Game([...Deck()],players)
        })

        it('contructs game with correct attributes',()=>{
            let copy={
                deck:[...Deck()],
                players:players,
                playersCards:{},
                winnerName:''

            }
            expect(game).to.deep.equal(copy);
        })

    })

    //Card Distribution
    describe('card distribution',()=>{
        let game;
        beforeEach(()=>{
            game=new Game([...Deck()],players)
        })
        it('checks if all players gets required no of card or not',()=>{
            const  noOfCards=3;
            game.distributeCardsToAllPlayersInTheGame(noOfCards);

            players.forEach(player=>{
                expect(game.playersCards[player].length).equal(noOfCards);
            })
        })

        it('checks if card left after distribution is correct ',()=>{
            const noOfCards=3;
            let initialCount=0;
            game.deck.forEach(cards=>{
                initialCount+=cards.count;
            })
            game.distributeCardsToAllPlayersInTheGame(noOfCards);

            let count=0
            game.deck.forEach(cards=>{
                count+=cards.count;
            })

            expect(count).equal(initialCount-noOfCards*game.players.length);
        });

        it('checks if the winner is their, it is one of the player only',()=>{
            game.distributeCardsToAllPlayersInTheGame(4);
            game.checkWinner();
            if(game.winnerName!==''){
                let isWinnerOneOfPlayer=players.includes(game.winnerName);
                expect(isWinnerOneOfPlayer).equal(true);
            }

        })
    })

    //check functions

    describe('Check functions ',()=>{

            //randomNumberGenerator
            let game;
            beforeEach(()=>{
                game=new Game([...Deck()],players)
            })

            it('check for random number generator function',()=>{
                let min=1;
                let max=10;
                let randomNumber=game.randomNumberGenerator(min,max);
                expect(randomNumber).to.be.within(min,max)
            })

            it('take out a card at in index and update',()=>{
                let card=game.getCardAtAnIndexAndUpdateDeck(0);
                expect(card).to.be.an('object');
                expect(card.count).to.equal(3)
            })

            it('check assign card to a player',()=>{
                let cards=[];
                game.assignCardToAPlayer(cards,1)
                expect(cards.length).to.equal(1);
            })

            it('check distribute card to all player in the game',()=>{
                const numberOfCards=5;
                game.distributeCardsToAllPlayersInTheGame(numberOfCards);
                for(let i=0; i<game.players.length; i++){
                    expect(game.playersCards[game.players[i]].length).to.equal(numberOfCards);

                }
            })

            it('checks is three patti and card value function',()=>{
                let cards=[new Card('A',10),new Card('A',10), new Card('A',10)];
                expect(game.isThreePattiAndCardValue(cards)).to.equal(10);
                cards=[new Card('B',11),new Card('A',10), new Card('A',10)];
                expect(game.isThreePattiAndCardValue(cards)).to.equal(false);
            })

            it('checks if sequence is their and max sequence value',()=>{
                let cards=[new Card('A',10),new Card('B',11), new Card('C',12)];
                expect(game.isSequenceAndMaxValue(cards)).to.equal(12);
                cards=[new Card('B',11),new Card('A',10), new Card('A',10)];
                expect(game.isSequenceAndMaxValue(cards)).to.equal(false);

            })

            it('checks if pair and max pair value',()=>{
                let cards=[new Card('A',10),new Card('A',10), new Card('C',12)];
                expect(game.isPairAndPairValue(cards)).to.equal(10);
                cards=[new Card('B',11),new Card('A',10), new Card('C',12)];
                expect(game.isPairAndPairValue(cards)).to.equal(false);

            })

    })
})


