import { useEffect, useState } from 'react'
import he from "he"
import { FaChevronUp } from "react-icons/fa";

const Home = () => {
    const [data, setData] = useState([])
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        fetch("https://www.reddit.com/r/reactjs.json ")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data.children)
                setData(data.data.children)
            }).catch((err) => {
                console.log(err)
            })
    }, [])


    function handleGoToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function checkScrollHeight() {
        // console.log(window.scrollY)
        if (window.scrollY > 700) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', checkScrollHeight);
        return () => {
            window.removeEventListener("scroll", checkScrollHeight)
        }
    }, []);

    // const htmlContent = "&lt;p&gt;Hello, world!&lt;/p&gt;";
    function MyComponent(htmlContent) {
        const decodedHtmlContent = he.decode(htmlContent);
        return decodedHtmlContent
    }

    return (
        <div>
            {
                data.map((obj, i) => (
                    <div className='one-item' key={i}>
                        <h1>{obj.data.title}</h1>
                        < div dangerouslySetInnerHTML={{ __html: MyComponent(obj?.data?.selftext_html ?? "&lt;p&gt;Hello, world!&lt;/p&gt;") }} />

                        <div className='btn-container'>
                            <div className='scoreDiv'>
                                <a href={obj.data.url} rel='noreferrer' target='_blank'>Read more ...</a>
                            </div>
                            <div className='scoreDiv'>Score {obj.data.score}</div>
                        </div>

                    </div>
                ))
            }
            {showTopBtn && <button className='showTopBtn' onClick={handleGoToTop}><FaChevronUp /></button>}
        </div >
    )
}

export default Home