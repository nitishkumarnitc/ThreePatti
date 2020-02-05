class Card{
    constructor(name,value,count){
       this.name=name;
       this.value=value;
       this.count=count
    }
}

const Deck =() => ( [new Card('A',14,4),
    new Card('K',13,4),
    new Card('Q',12,4),
    new Card('J',11,4),
    new Card('10',10,4),
    new Card('9',9,4),
    new Card('8',8,4),
    new Card('7',7,4),
    new Card('6',6,4),
    new Card('5',5,4),
    new Card('4',4,4),
    new Card('3',3,4),
    new Card('2',2,4)
]
)

module.exports={Deck:Deck,Card:Card};