import { LogoutOutlined } from "@mui/icons-material";
import { Avatar, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom"

export const Home = () => {

    const navigate = useNavigate();

    const [totalData, setTotalData] = useState<any>();
    const [pages, setPages] = useState(50);

    const fetchData = async (props: any = 50) => {
        if (props < 500) {
            setPages(pages + props)
            let url = `https://randomuser.me/api/?results=${pages + props}`;
            let options = {
                method: 'GET'
            }
            let response: any = await fetch(url, options);
            response = await response.json();
            setTotalData(response?.results);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('loginOrNot')) {
            navigate('/');
        } else {
            fetchData();
        }

    }, []);

    return (
        <div>
            <div style={{ background: "#1876d2", textAlign: "right" }}>
                <IconButton onClick={() => {
                    localStorage.clear();
                    navigate('/');
                }}><LogoutOutlined />Logout</IconButton>
            </div>

            <div style={{ marginTop: "20px" }}>

                <InfiniteScroll
                    dataLength={totalData?.length || 0}
                    next={() => fetchData(50)}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    hasMore={true}
                    inverse={false}
                    loader={<div>
                        <div style={{ display: "flex" }}>
                            <div style={{ background: "#d2d2d2", width: "80%", height: "50px", borderRadius: "10%", marginTop: "20px" }}></div>
                            <div style={{ background: "#d2d2d2", width: "15%", height: "50px", borderRadius: "50%", marginTop: "20px", marginLeft: "5%" }}></div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ background: "#d2d2d2", width: "80%", height: "50px", borderRadius: "10%", marginTop: "20px" }}></div>
                            <div style={{ background: "#d2d2d2", width: "15%", height: "50px", borderRadius: "50%", marginTop: "20px", marginLeft: "5%" }}></div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ background: "#d2d2d2", width: "80%", height: "50px", borderRadius: "10%", marginTop: "20px" }}></div>
                            <div style={{ background: "#d2d2d2", width: "15%", height: "50px", borderRadius: "50%", marginTop: "20px", marginLeft: "5%" }}></div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ background: "#d2d2d2", width: "80%", height: "50px", borderRadius: "10%", marginTop: "20px" }}></div>
                            <div style={{ background: "#d2d2d2", width: "15%", height: "50px", borderRadius: "50%", marginTop: "20px", marginLeft: "5%" }}></div>
                        </div>
                    </div>}
                    scrollableTarget="scrollableDiv"
                >
                    {totalData && totalData?.map((item: any, index: any) => (
                        <div key={index}>
                            <div style={{ display: "flex", height: "50px" }}>
                                <div style={{ width: "100%", textAlign: 'left' }}>
                                    <h3>{item?.name?.title + '. ' + item?.name?.first + '' + item?.name?.last}</h3>
                                </div>
                                <div><Avatar src={item?.picture?.medium} /></div>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

        </div>
    )
}