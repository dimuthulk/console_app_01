import chalk from 'chalk';
import fs from 'fs';

const db_file = 'guest.json';

const addGuest = (name,address,contact_no,visit_date) =>{
    const guests= loadGuest();
    const length = guests.length;
    let id = 1;
    if(length > 0) {
        id = guests[length-1].id+1;
    }
    guests.push({
        id,
        name,
        address,
        contact_no, 
        visit_date
    });
    saveGuest(guests);
    console.log(chalk.green("Data Saved"));
}

const updateGuest = (id,name,address,contact_no,visit_date) => {
    const guests = loadGuest();
    const guestIndex = guests.findIndex((guest) => guest.id === id);
    if(guestIndex === -1) {
        console.log(chalk.red("Guest not found"));
        return;
    } else{
        guests[guestIndex].name = name;
        guests[guestIndex].address = address;
        guests[guestIndex].contact_no = contact_no;
        guests[guestIndex].visit_date = visit_date;
        saveGuest(guests);
        console.log(chalk.green(id," Record Updated: "));
    }
 
}

const deleteGuest = (id) => {
    const guests = loadGuest();
    const newGuests = guests.filter((guest) => guest.id !== id);
    if(guests.length === newGuests.length) {
        console.log(chalk.red("Guest not found"));
        return;
    } else {
        saveGuest(newGuests);
        console.log(chalk.red("Delete: ",id));
    }
}

const readGuest = (id) => {
    const guests = loadGuest();
    const guest = guests.find((guest) =>guest.id === id);
        if(!guest) {
            console.log(chalk.red("Guest not found"));
            return;
        }else{console.log(guest);}
}

const listGuest = () => {
    console.log(chalk.magenta("Guest List"));
    const guests = loadGuest();
    guests.forEach((guest) => {
        console.log(guest);
    });
}

const saveGuest = (guest) => {
    const dataJSON = JSON.stringify(guest);
    fs.writeFileSync(db_file,dataJSON);
}

const loadGuest = () => {
    try{
        const dataBuffer = fs.readFileSync(db_file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}
export default {addGuest,updateGuest,readGuest,deleteGuest,listGuest};