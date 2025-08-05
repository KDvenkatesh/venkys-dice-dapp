// module venky_addr::todo {
//     use std::string::String;
//     use std::signer;
//     use aptos_std::table::{Self , Table , new , add , borrow , remove};

//     struct Todo has copy,drop,store{
//         id:u64,
//         title:String,
//         description:String,
//         Status:bool,
//     }

//     struct TodoList has key{
//         counter:u64,
//         todos:Table<u64,Todo>,
//     }
//     fun init_list_if_needed(sender:&signer){
//         let addr = signer::address_of(sender);
//         if(!exists<TodoList>(addr)){
//             move_to(sender ,TodoList {counter:0 , todos:new<u64 ,Todo>()})
//         }

//     }

//     public entry fun create_todo(
//         account:&signer,
//         title:String,
//         description:String
//     )acquires TodoList{
//         init_list_if_needed(account);
//         let list = borrow_global_mut<TodoList>(signer::address_of(account));
//         list.counter=list.counter+ 1;
//         let id =list.counter;
    
         
//         add(&mut list.todos, id, Todo {
//             id,
//             title,
//             description,
//             Status: false,
//         });

//     }

// }