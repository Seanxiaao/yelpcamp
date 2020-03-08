var spec = require("./models/scenegrounds"),
    Comments = require("./models/comments");

var data = [
    {
        name: "Angel Falls, Venezuela", url: "https://media.cntraveler.com/photos/5cb63a087b743b471660a8da/master/w_820,c_limit/Angel-Falls-Venezuela_GettyImages-165513023.jpg",
        description:"Venezuela overflows with natural wonders, including the world's highest waterfall—the 3,212-foot cascades of Angel Falls, located in the UNESCO-protected Canaima National Park. Canaima is by far the country's most popular attraction, and the falls stretch an astounding 19 times higher than Niagara Falls. Bonus: Pixar animators used the location as inspiration for Paradise Falls in Up—so you know it's good."
    },
    {
        name: "Antarctica", url: "https://media.cntraveler.com/photos/5cb63a087b743b350a60a8d9/master/w_820,c_limit/Antarctica-_GettyImages-148815908.jpg",
        description:"That's right, we put an entire continent on here. Although 99 percent of Antarctica is covered with ice, the landscape still manages to be stunningly diverse—surreal blue glaciers, active volcanoes, the rough waterways of the Drake Passage, and 360-degree views of untouched snow. And those views are made even better when an emperor penguin or humpback whale makes an appearance."
    },
    {
        name: "Antelope Canyon, Arizona", url:"https://media.cntraveler.com/photos/5cb63a076b5c4d5dcc5ec14a/master/w_820,c_limit/Antelope-Canyon-AZ_GettyImages-164342990.jpg",
        description:"Antelope Canyon is a slot canyon (and serious Instagram darling) in the American Southwest. Its Navajo name translates to “the place where water runs through rocks”—an allusion to the canyon’s creation through erosion. The narrow, undulating spaces between rock formations allow for vivid patterns when sunlight filters through the striated stone."
    },
    {
        name: "Atacama Desert, Chile", url:"https://media.cntraveler.com/photos/5cb896b82721dd144b749295/master/w_820,c_limit/GettyImages-rh94-1911.jpg",
        description:"Have you ever dreamed of exploring the moon? A trip to Valle de la Luna in Chile’s Atacama Desert is a much shorter flight. Years of erosion have left behind jagged peaks, dry riverbeds, and a landscape startlingly similar to that of our favorite celestial body's."
    },
    {
        name:"Disko Bay, Greenland", url:"https://media.cntraveler.com/photos/5cb63a1711a45e6c99303730/master/w_820,c_limit/Disko-Bay-Greenland_GettyImages-975897188.jpg",
        description:"Greenland is icy, mysterious, and one of the most naturally beautiful places on the planet. Disko Bay perfectly illustrates the untouched allure of the island with its impressive icebergs, charming coastal settlements, and common sightings of breaching humpback whales."
    },
    {
        name:"Galápagos Islands, Ecuador", url:"https://media.cntraveler.com/photos/5cb63a186b5c4d931c5ec153/master/w_820,c_limit/Galapagos-Islands_GettyImages-538999700.jpg",
        description:"Do we really have to explain the allure of the Galápagos? If you can, make your next travel goal to visit this of-another-time stretch of Ecuador, with dinosaur-like giant tortoises lumbering through the tall grass and real-life blue-footed boobies. Pro tip: A cruise is definitely the preferred way to explore the islands. Celebrity Cruise’s Xpedition only ferries 100 passengers and holds nightly lectures by naturalists from Galápagos National Park."
    }
];


function seedDB() {
    spec.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            data.forEach(function (seed) {
                spec.create(seed, function (err, specs) {
                    // if (err) {
                    //     console.log(err);
                    // } else {
                    //     Comments.create({
                    //         text: "great place but hopeful more people can find it",
                    //         author: "Sean Xiao"
                    //         }, function (err, comment) {
                    //             if (err) {
                    //                 console.log(err);
                    //             } else {
                    //                 specs.comments.push(comment);
                    //                 specs.save();
                    //                 console.log("reached");
                    //         }
                    //     });
                    // }
                })
            });
        }
    });
}

module.exports = seedDB;