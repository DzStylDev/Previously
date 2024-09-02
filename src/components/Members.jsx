import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
// import { useEffect } from "react";
import "../css/app.css";

export default function Members() {

    const [getUsers, setUsers] = useState([]);
    const [getUsersPartials, setUserPartial] = useState([]);
    const [getRequetes, setRequetes] = useState([]);

    let recupereID = [];
    let pushRequetes = [];

    const getMembersOfBetaSeries = () => {

        let ajouteGetAxios = [];
        let allUser = [];

        let strs = ['a', 'b', 'c'];

        for (let index = 0; index < strs.length; index++) {
            ajouteGetAxios.push(axios.get(`https://api.betaseries.com/members/search?login=%${strs[index]}`, {
                headers: {
                    Authorization: "Bearer 2cdb1c222eff",
                    "X-BetaSeries-Key": "4a594a99c9e2",
                }
            }))
        }

        axios.all(ajouteGetAxios).then(axios.spread((...allData) => {
            allData.forEach(allData => {
                allUser.push(allData.data.users);

                setUsers(allUser);

            })
            allData.map((object, index) => {
                recupereID.push([])
                object.data.users.map(user => {
                    recupereID[index].push(`${user.id}`);
                })
            })
        })
        )
    }

    const getMembersPartial = () => {

        recupereID.map((uriinfos, index) => {
            pushRequetes.push([])
            uriinfos.map(id => {
                axios.get(`https://api.betaseries.com/members/infos?id=${id}`, {
                    headers: {
                        Authorization: "Bearer 2cdb1c222eff",
                        "X-BetaSeries-Key": "4a594a99c9e2",
                    }
                }).then(axiosReponse => {
                    pushRequetes[index].push(axiosReponse.data)
                    setRequetes(pushRequetes)
                })
            })
        })
    }

    const addFriend = (user) => {
        axios.post('https://api.betaseries.com/friends/friend', {
        }, {
            params: {
                id: user.id,
                token: "2cdb1c222eff"
            },
            headers: {
                'X-BetaSeries-Key': "4a594a99c9e2"
            }
        }).then(axiosReponse => {
            return axiosReponse.data
        }).then(users => {
            console.log(users.member);
        })
    }
    const unBlock = (user) => {

        axios.delete('https://api.betaseries.com/friends/block?v=3.0', {
            params: {
                id: user.id,
            },
            headers: {
                Authorization: "Bearer 2cdb1c222eff",
                "X-BetaSeries-Key": "4a594a99c9e2",
            }
        })
            .then(axiosReponse => {
                console.log('utilisateur débloquer avec successs', axiosReponse.data);
            })
    }
    const blockMember = (user) => {
        axios.post('https://api.betaseries.com/friends/block?v=3.0', {
            id: user.id,
            token: "2cdb1c222eff"
        }, {
            headers: {
                'X-BetaSeries-Key': "4a594a99c9e2",
            },
        })
            .then(axiosReponse => {
                console.log('utilisateur bloquer avec successs', axiosReponse.data);
            })
    }

    const checkUser = (users) => {
        axios.get('https://api.betaseries.com/members/infos', {
            params: {
                id: users.id
            },
            headers: {
                Authorization: "Bearer 2cdb1c222eff",
                "X-BetaSeries-Key": "4a594a99c9e2",
            }
        }).then(axiosReponse => {
            console.log(axiosReponse.data.member)
        })
    }

    useEffect(() => {
        getMembersOfBetaSeries();
        getMembersPartial();
    }, []);
    return (
        <>
            <div className="wrapper">
                < Header />
                <main className="mainHome">
                    {getUsers.map((users, indexParent) => {
                        return (
                            <main className="blok-container" key={indexParent}>
                                {users.map((user, index) => {
                                    return (
                                        <div key={index} className="container-friend" onClick={() => checkUser(user)}>
                                            <div className="member-title">{user.login}</div>
                                            {
                                                user.in_account === true
                                                    ?
                                                    <button disabled className="button_ajout_isFriend">Déjà en ami</button>
                                                    :
                                                    <div className="buttonAjoutAndBlock">
                                                        <button className="button_ajout" onClick={() => addFriend(user)}>Ajouter en ami</button>
                                                        <button className="button_ajout" onClick={() => blockMember(user)}>Bloquer</button>
                                                        <button className="button_ajout" onClick={() => unBlock(user)}>Débloquer</button>
                                                    </div>
                                            }
                                            <div className="groupe-member-options">
                                                <div className="member-account">
                                                    {
                                                        user.in_account === true
                                                            ?
                                                            <img src={require("../asset/boutonVert.png")} className="btnAdd2" alt="icone vert" />
                                                            :
                                                            <img src={require("../asset/boutonRouge.png")} className="btnAdd2" alt="icone rouge" />

                                                    }
                                                </div>
                                                <div className="member-container-xp">
                                                    <div className="xp_title">{user.xp}</div>
                                                    <img src={require('../asset/xp.png')} alt="xp" className="btnAdd2" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </main>
                        )
                    }
                    )}
                </main>
            </div>
        </>
    )
}
// useEffect(() => {
//     getMembersOfBetaSeries()
// }, []);
