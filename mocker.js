var faker = require("faker");
var User = require("./src/models/user");
var Chat = require("./src/models/chat");
var Orders = require("./src/models/orders");
var Contact = require("./src/models/contact");
var mongoose = require("mongoose");
const Documents = require("./src/models/documents");
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
userRec.balance = faker.commerce.price();
userRec.addresses = [{addressid:faker.random.uuid(),city:'Toronto',province:'Ontario'}]
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
    chat.messages = [{text:'hello',createdAt:faker.date.past(),user:user1},{text:'hello',createdAt:faker.date.past(),user:user2}]
    chat.chatid = faker.random.uuid();
    await chat.save()
    console.log('chat.saved')
}

const docFaker = async () => {
    for(var i = 0 ; i < 100 ; i++) {
    var docRec = new Documents();
    docRec.userid = faker.random.uuid();
    docRec.doctype = "photoid",
    docRec.uploadDate = faker.date.past();
    docRec.docfile = faker.image.avatar();
    docRec.docid = faker.random.uuid();
}
}

const orderFaker = async () => {
    for(var i = 0 ; i< 20; i++) {
    var order = new Orders();
    order.userid = "e9f5b68e-5dac-485f-8f10-52af25b7d1c3";
    order.shopname = faker.company.companyName();
    order.shoplocation = {lat:faker.address.latitude(),long:faker.address.longitude()}
    order.items = [{productname:faker.commerce.productName(),quantity:1,productimage:faker.internet.avatar(),price:faker.commerce.price(),available:null}]
    order.order_date = faker.date.past();
    order.amount = faker.random.number();
    order.escrow = faker.random.number();
    order.status = 'pending',
    order.driverid = faker.random.uuid();
    order.orderid = faker.random.uuid();
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

const driverFaker = async () => {
    for(var i = 0 ; i < 10 ; i++) {
        var driver = new Drivers();
        driver.userid = faker.random.uuid();
        driver.location = {lat:faker.address.latitude(),long:faker.address.longitude()};
        driver.country = "Canada";
        driver.city = "Toronto";
        driver.active = true;
        driver.verified = false;
        driver.vehicle = "Supra";
        await driver.save();
        console.log('driver saved', i)
    }
}


ticketFaker();
orderFaker();
chatFaker();
userfaker();
docFaker();
driverFaker();