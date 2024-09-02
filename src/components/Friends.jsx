import axios, { all } from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
// import { useEffect } from "react";
import "../css/friends.css";

export default function Friends() {

    const [getFriends, setFriends] = useState([]);
    const [getTotalOfFriends, setTotalOfFriends] = useState(0);

    const list_of_friends = () => {
        axios.get('https://api.betaseries.com/friends/list?token=2cdb1c222eff', {
            headers: {
                'X-BetaSeries-Key': "4a594a99c9e2"
            }
        }).then(axiosReponse => {
            return axiosReponse.data
        }).then(friends => {
            setTotalOfFriends(friends.total)
            setFriends(friends.users);
            console.log(friends)
        })
    }
    const deleteFriend = (friend) => {
        axios.delete('https://api.betaseries.com/friends/friend?v=3.0', {
            headers: {
                'X-BetaSeries-Key': "4a594a99c9e2"
            },
            params: {
                id: friend.id,
                token: "2cdb1c222eff",
            }
        })
            .then(axiosReponse => {
                console.log('utilisateur supprimer avec successs', axiosReponse.data);
            })
    }
    const blockFriend = (event, friend) => {

        // let buttons = document.getElementsByClassName('buttons')[0].children[0]

        // if (event.target.innerText !== "Débloquer") {
        //     event.target.innerHTML = "Débloquer";
        //     event.target.parentElement.children[1].style.display = "none"

            axios.post('https://api.betaseries.com/friends/block?v=3.0', {
                id: friend.id,
                token: "2cdb1c222eff"
            }, {
                headers: {
                    'X-BetaSeries-Key': "4a594a99c9e2",
                },
            })
                .then(axiosReponse => {
                    console.log('utilisateur bloquer avec successs', axiosReponse.data);
                })
        // } else {
        //     event.target.innerHTML = "Bloquer";
        //     event.target.parentElement.children[1].style.display = "block"

            // axios.delete('https://api.betaseries.com/friends/block?v=3.0', {
            //     id: friend.id,
            //     token: "2cdb1c222eff",
            // }, {
            //     headers: {
            //         'X-BetaSeries-Key': "4a594a99c9e2",
            //     },
            // })
            //     .then(axiosReponse => {
            //         console.log('utilisateur débloquer avec successs', axiosReponse.data);
            //     })
        // }
    }
    useEffect(() => {
        list_of_friends();
    }, []);
    return (
        <>
            <div className="wrapper">
                < Header />

                <main className="mainHome">
                    <div className="title-friends">
                        <h1>Tu as {getTotalOfFriends} amis</h1>
                    </div>
                    <div className="blok-container2">
                        {getFriends.map((friend, index) => {
                            return (

                                <div key={index} className="container-friend">
                                    <div className="member-title">{friend.login}</div>
                                    <div className="image-container">
                                        {
                                            friend.avatar ?

                                                <img src={friend.avatar} alt="image" className="image" />
                                                :
                                                <img src={require("../asset/utilisateur_5.png")} className="image"></img>
                                        }
                                    </div>
                                    <div className="buttons">
                                        <button className="button_ajout" onClick={() => deleteFriend(friend)}>Supprimer</button>
                                        <button className="button_ajout" onClick={(event) => blockFriend(event, friend)}>Bloquer</button>
                                    </div>
                                    <div className="friend-container-options">
                                        <div>Nombre d'amis</div>
                                        <div>{friend.friends_count}</div>
                                    </div>
                                    <div className="groupe-member-options">
                                        <div className="member-account">
                                            {
                                                friend.in_account !== true
                                                    ?
                                                    <img src={require("../asset/boutonVert.png")} className="btnAdd2" alt="icone vert" />
                                                    :
                                                    <img src={require("../asset/boutonRouge.png")} className="btnAdd2" alt="icone rouge" />

                                            }
                                        </div>
                                        <div className="member-container-xp">
                                            <div className="xp_title">{friend.xp}</div>
                                            <img src={require('../asset/xp.png')} alt="xp" className="btnAdd2" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}