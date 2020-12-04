var faker = require("faker");
var User = require("./src/models/user");
var Chat = require("./src/models/chat");
var Products = require("./src/models/products");
var Shops = require("./src/models/shops");
var Orders = require("./src/models/orders");
var Contact = require("./src/models/contact");
var mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true, 
    useFindAndModify:false, 
  });

const userfaker = async () => {
for(var i = 0 ; i < 100 ; i++) {
var userRec = new User();
userRec.name = faker.name.findName();
userRec.username = faker.internet.userName();
userRec.userid = faker.random.uuid();
userRec.password = faker.internet.password();
userRec.email = faker.internet.email();
userRec.avatar = faker.internet.avatar();
userRec.role = "user";
userRec.phone = faker.phone.phoneNumber();
userRec.activationStatus = 0;
await userRec.save();
console.log('user saved', i)

}
}

const chatFaker = async () => {
    var user1 = new User();
    var user2 = new User();
    user1.userid = faker.random.uuid();
    user2.userid = faker.random.uuid();
    user1.name = faker.name.findName();
    user2.name = faker.name.findName();
    user1.avatar = faker.internet.avatar();
    user2.avatar = faker.internet.avatar();
    var chat = new Chat();
    chat.participants = [user1.userid,user2.userid];
    chat.orderid = faker.random.uuid();
    chat.messages = [{text:'hello',createdAt:faker.date.past(),user:user1},{text:'hello',createdAt:faker.date.past(),user:user2}]
    await chat.save()
    console.log('chat.saved')
}

const productFaker = async () => {
    for(var i = 0 ; i< 100 ; i++) {
        var prod = new Products();
        prod.name = faker.commerce.product();
        prod.price = faker.commerce.price();
        prod.productid = faker.random.uuid();
        prod.stock = faker.random.number();
        prod.image = faker.internet.avatar();
        prod.description = faker.commerce.productDescription();
        prod.isOnSale = true;
        prod.isOnPromo = false;
        prod.promoPrice = 0;
        prod.date = faker.date.past();
        prod.shopid = "4e03c106-d7db-4a23-ba99-d536dcb3b5a9";
        await prod.save();
        console.log('saved prod', i)
    }
}

const shopFaker = async () => {
    for(var i = 0 ; i< 20 ; i++) {
        var shop = new Shops();
        shop.name = faker.company.companyName();
        shop.tags = [],
        shop.shopid = faker.random.uuid();
        shop.image = faker.internet.avatar();
        shop.description = faker.commerce.productDescription();
        shop.rating = Math.floor(Math.random() * 5);
        shop.location = {lat:faker.address.latitude(),
                         long:faker.address.longitude()
        }
        await shop.save();
        console.log('saved shop', i)
    }
}

const orderFaker = async () => {
    for(var i = 0 ; i< 20; i++) {
    var order = new Orders();
    order.userid = "e9f5b68e-5dac-485f-8f10-52af25b7d1c3";
    order.items = [{productid:faker.random.uuid(),quantity:faker.random.number()},{productid:faker.random.uuid(),quantity:faker.random.number()},{productid:faker.random.uuid(),quantity:faker.random.number()}]
    order.order_date = faker.date.past();
    order.amount = faker.random.number();
    order.status = 'pending',
    order.driverid = faker.random.uuid();
    order.orderid = faker.random.uuid();
    order.tips = 0;
    order.notes = faker.commerce.productDescription();
    await order.save();
    console.log('saved order', i)
}
}

const ticketFaker = async () => {
    for(var i = 0 ; i < 10 ; i++) {
        var ticket = new Contact();
        ticket.ticket_id = faker.random.uuid();
        ticket.user_id = "e9f5b68e-5dac-485f-8f10-52af25b7d1c3";
        ticket.user_email = "developer@developer.com";
        ticket.messages = [{user_id:"e9f5b68e-5dac-485f-8f10-52af25b7d1c3",message:"hello",date:faker.date.past()},{user_id:faker.random.uuid(),message:"hello",date:faker.date.past()}]
        ticket.rating = 0;
        ticket.status = 'active';
        await ticket.save();
        console.log('ticket saved', i)
    }
}

ticketFaker();
orderFaker();
shopFaker();
productFaker();
chatFaker();
userfaker();