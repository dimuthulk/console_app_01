import chalk from 'chalk';
import db from './guestdb.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

console.log(chalk.bgYellow("No Error!"));
// db.addGuest();
// db.updateGuest();

yargs(hideBin(process.argv))
    .command({
        command: 'add',
        describe: 'Add a new guest',
        builder: {
            name: {
                describe: 'Guest name',
                demandOption: true,
                type: 'string'
            },
            address: {
                describe: 'Guest address',
                demandOption: true,
                type: 'string'
            },
            contact_no: {
                describe: 'Guest contact number',
                demandOption: true,
                type: 'number'
            },
            visit_date: {
                describe: 'Visit date',
                demandOption: true,
                type: 'string'
            },
        },
        handler: function (argv) {
            db.addGuest(argv.name,argv.address,argv.contact_no,argv.visit_date);
        }
    })
    .command({
        command: 'update',
        describe: 'Update a guest',
        builder: {
            id: {
                describe: 'Guest id',
                demandOption: true,
                type: 'number'
            },
            name: {
                describe: 'Guest name',
                demandOption: true,
                type: 'string'
            },
            address: {
                describe: 'Guest address',
                type: 'string'
            },
            contact_no: {
                describe: 'Guest contact number',
                type: 'number'
            },
            visit_date: {
                describe: 'Visit date',
                type: 'string'
            },
        },
        handler: function (argv) {
            db.updateGuest(argv.id,argv.name,argv.address,argv.contact_no,argv.visit_date);
        }
    })

    .command({  
        command: 'delete',
        describe: 'Delete a guest',
        builder: {
            id: {
                describe: 'Guest id',
                demandOption: true,
                type: 'number'
            },
        },
        handler: function (argv) {
            db.deleteGuest(argv.id);
        }
    })
    .command({
        command: 'read',
        describe: 'Read a guest',
        builder: {
            id: {
                describe: 'Guest id',
                demandOption: true,
                type: 'number'
            },
        },
        handler: function (argv) {
            db.readGuest(argv.id);
        }
    })
    .command({
        command: 'list',
        describe: 'List all guests',
        handler: function () {
            db.listGuest();
        }
    })
.version("1.1.0")
.argv;