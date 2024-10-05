import Library from './../images/Library.jpeg'

// component that displays the Home page
const Home = () => {
    return(
        <>
        <div className="text-center">
            <h2>Welcome to Share2Teach</h2>
            <hr />
            <img src={Library} alt='Library'></img>

        </div>
        </>
    )
}

export default Home;