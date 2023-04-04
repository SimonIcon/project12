
import axios from "axios";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";





export const NewsContext = createContext();
const Context = ({ children }) => {
  const [source, setSource] = useState();
  const [category, setCategory] = useState('general')
  const [news, setNews] = useState([]);
  const [countryNews, setCountryNews] = useState('us')
  const [checkActive, setCheckActive] = useState(false)
  const [favoriteNews, setFavoriteNews] = useState([])
  const apiKey = "b8dee7b2ff334f23b8fd7368697e6edd";
  const api = "ef3e3e2ea2094f73b0ac10b194ce1f6c";



  // fetching articles from sources
  const BASE_URLOne = `https://newsapi.org/v2/top-headlines?apikey=${api}`
  const NEWS_API_URL = `${BASE_URLOne}&sources=${source}`
  const fetchNewsFromSource = async () => {
    try {
      const { data } = await axios.get(NEWS_API_URL)
      setNews(data)
    } catch (error) {
      console.log("symoh you are wrong be carefull")
      console.log(error)
    }
  }
  useEffect(() => {
    fetchNewsFromSource();
  }, [source])
  //  end of fetching news by source
  //   fetching articles from different category
  const BASE_URL = `https://newsapi.org/v2/top-headlines?country=${countryNews}`;
  const newsCategoryUrl = `${BASE_URL}&category=${category}&apikey=${apiKey}`;
  const fetchCategoryNews = async () => {
    try {
      const { data } = await axios.get(newsCategoryUrl)
      setNews(data)
    } catch (error) {
      console.log("symoh below error was encounterred when fetching news from different category")
    }
  }
  useEffect(() => {
    fetchCategoryNews();
  }, [category])







  

  // creating user with email and password using firebase backend that in return give user token
  const registerUser = async (email, password, name, url, country) => {
    const res = createUserWithEmailAndPassword(auth, email, password)
    setDoc(doc(db, "userDetails", (await res).user.uid), {
      username: name,
      email: email,
      userProfile: url,
      userCountry: country
    })
  }




  










  // checking if user has logged in and updating user token with setUser state
  const [user, setUser] = useState([]);
  const [activeUserId, setActiveUserId] = useState('')
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCheckActive(true)
        const snapshot = await getDoc(doc(db, "userDetails", user.uid))
        setUser(snapshot.data())
        setActiveUserId(snapshot.id)

      }
    });
  }, []);







  // sign in user who has a valid token only
  const loginInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).
    then((res) => {console.log(" login succesfull")})
      .catch((err) => {
        console.log('error while login in')
      })
  }
  // sign out user




















  const logOutUser = () => {
    signOut(auth)
    if (signOut(auth)) {

      setTimeout(() => {
        setCheckActive(false)
      }, 1000);
    }
  }


























  const handleFavoriteNews = (author, content, publishedAt, title, source, url) => {
    const userDetailsRef = doc(db, "userDetails", activeUserId);
    getDoc(userDetailsRef)
      .then((doc) => {
        if (doc.exists()) {
          const favoritesNewsCollectionRef = collection(db, "userDetails", activeUserId, "favoriteNews");
          addDoc(favoritesNewsCollectionRef, {
            author: author,
            content: content,
            publishedAt: publishedAt,
            title: title,
            source: source,
            url: url
          })


        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

  }
  const favorite = []
  const [fav, setFav] = useState([])
  useEffect(() => {
    const fetchLocalNews = async () => {
      const querySnapshot = await getDocs(collection(db, "userDetails"));
      if (querySnapshot.docs.length) {
        const fetchedUserData = [];
        for (const doc of querySnapshot.docs) {
          const userDetails = { id: doc.id, ...doc.data() };
          // Check if the `tasks` subcollection exists for the current `warden` document
          const favQuerySnapshot = await getDocs(collection(doc.ref, "favoriteNews"));
          if (favQuerySnapshot.docs.length) {
            favQuerySnapshot.forEach((doc) => {
              favorite.push({ id: doc.id, ...doc.data() })
            });
          }
          setFav(favorite)

        }

      } else {
        console.log("No documents found");
      }



    }
    fetchLocalNews()
  }, [])

  return (
    <NewsContext.Provider value={{
      setSource, news, setCategory, setNews, setCountryNews,
      registerUser, loginInUser, checkActive, user, logOutUser, category, setFavoriteNews,
      handleFavoriteNews, fav

    }}>
      {children}
    </NewsContext.Provider>
  )
}

export default Context;

