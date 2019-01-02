document.addEventListener('DOMContentLoaded', function(){
    var id = document.getElementById('id');
    var username = document.getElementById('username');
    var pwd = document.getElementById('pwd');
    var msgOut = document.getElementById('msgOut');
    var save_btn = document.getElementById('save-btn');
    save_btn.addEventListener('click', function(e){
        e.preventDefault()  
        //The init config for saveIndexedDB
        var init = {
            dbName: 'ErrandsDB',
            store: {
                name: 'users',
                params: {
                    keyPath: 'id'
                }
            },
            index: {
                name: 'username',
                other: 'username',
                params: {
                    unique: true
                }
            },
            txParams: 'readwrite',
            body: {
                method: 'put',
                inserts: [
                    {id: id.value, username: username.value, password: pwd.value},
                   
                ]
            }
            
        }
        
        //End for init config for saveIndexedDB
            saveIndexedDB(init,1,function(result){
                if(id.length>0|| username.length>0 || pwd.length>0){
                    msgOut.innerText = 'Id: '
                    msgOut.innerText += result.saved.id;
                    msgOut.innerText += ' Username: ';
                    msgOut.innerText += result.saved.username;
                    msgOut.innerText += ' Password: ';
                    msgOut.innerText += result.saved.password;
                }else
                if(result === 'undefined'){
                    msgOut.innerText = 'no data found';
                }else if(result === 'check your method'){
                    msgOut.innerText = 'check your method';
                }else if(result === 'username taken'){
                    msgOut.innerText = 'username taken and id even the empty one';
                } 
                 else {
                     msgOut.innerText = 'saved';
                 }
               
                
            })
            ;
    }) ;

    var searchInput = document.getElementById('searchInput');
    var get_btn = document.getElementById('get-btn');
    var root = document.getElementById('root');
    get_btn.addEventListener('click',function(e){
        e.preventDefault()
        var searchthis = searchInput.value;
        if(searchthis){
            var init = {
                dbName: 'ErrandsDB',
                store: {
                    name: 'users',
                    params: {
                        keyPath: 'id'
                    }
                },
                index: {
                    name: 'username',
                    other: 'username',
                    params: {
                        unique: true
                    }
                },
                txParams: 'readwrite',
                body: {
                    method: 'get',
                    inserts: [
                        {id: id.value, username: username.value, password: pwd.value},
                       
                    ]
                }
                
            }
            saveIndexedDB(init,searchthis,function(result){
                if(result === 'undefined'){
                    console.log(result)
                    root.innerText = 'no data found'
                }else{
                    root.innerText = 'Id: '
                    root.innerText += result.id;
                    root.innerText += ' Username: ';
                    root.innerText += result.username;
                    root.innerText += ' Password: ';
                    root.innerText += result.password;
                }
               
            })
        }else {
            root.innerText = 'Field cannot be Empty'
        }
    })

})



