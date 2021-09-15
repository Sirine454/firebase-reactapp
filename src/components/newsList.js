
import React from "react"
import NewsForm from "./newsForm"
import { useState ,useEffect} from "react"
import {projectFirestore} from "../db"
import 'bootswatch/dist/slate/bootstrap.min.css'; 




const NewsList = () => {
  const [news, setNews] = useState([])
  const [currentId,setCurrentId]=useState("")

  const getNews=async()=>{
    projectFirestore.collection("news").onSnapshot((querysnapshot)=>{
      const docs=[]
      querysnapshot.forEach((doc)=>{
        docs.push({ ...doc.data(), id: doc.id })
      })
      setNews(docs)
    })
  }

  const onDeleteNews = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await projectFirestore.collection("news").doc(id).delete();
      
    }
  };
  useEffect(() => {
    getNews();
  }, []);
  const addOrEditNews = async (newsObject) => {
    try {
      if (currentId === "") {
        await projectFirestore.collection("news").doc().set(newsObject);
        
      } else {
        await projectFirestore.collection("news").doc(currentId).update(newsObject);
      
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <NewsForm {...{ addOrEditNews, currentId, news }} />
      </div>
      <div className="col-md-8 p-2">
        {news.map((el) => (
          <div className="card mb-1" key={el.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
              <h6>{el.catégorie}</h6>
                <h4>{el.title}</h4>
                <div>
                  <button
                    className="material-icons text-danger"
                    onClick={() => onDeleteNews(el.id)}
                  >
                    close
                  </button>
                  <br/>
                  <button
                    className="material-icons"
                    onClick={() => setCurrentId(el.id)}
                  >
                    create
                  </button>
                </div>
              </div>
              <p>{el.description}</p>
              <a href={el.link} target="_blank" rel="noopener noreferrer">Go to Website</a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default NewsList
