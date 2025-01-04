import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
	// Create a Date object from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the Date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Return the formatted date string
	return `${month} ${day}, ${year}`;
}

const historyPage = () => {
	const [searchHistory, setSearchHistory] = useState([]);

    //fetches the user's search history and helps  to display seach history
	useEffect(() => {
		const getSearchHistory = async () => {
			try {
                //sends of GET request to backend endpoint respoisnbile for retruving user's serach hsitory 
                //these endpoints are produced by protectRoute to ensure user is loged in 
                //protectRoute does this by checking the token stored in cookies
				const res = await axios.get(`/api/v1/search/history`);
                //updates the UI state with the search history
				setSearchHistory(res.data.content);
			} catch (error) {
				setSearchHistory([]);
			}
		};
		getSearchHistory();
        //dependecy as a empy array means the effect runs only once
	}, []);

    //deletes a search history entry using the id 
	const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
            //this updates the UI state by removing the deleted entry ffrom the UI
			setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
		} catch (error) {
            //shows error message popup
			toast.error("Failed to delete search item");
		}
	};

    //if there is no search history, this will be displayed
	if (searchHistory?.length === 0) {
		return (
			<div className='bg-black min-h-screen text-white'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Search History</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl'>No search history found</p>
					</div>
				</div>
			</div>
		);
	}


    //if there is search history, this will be displayed
	return (
		<div className='bg-black text-white min-h-screen'>
            {/* //displays the navbar */}
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8'>Search History</h1>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4'>
                    {/* maps through the search history and displays the search history */}
					{searchHistory?.map((entry) => (
						<div key={entry.id} className='bg-gray-800 p-4 rounded flex items-start'>
                            {/* displays the image of the search history */}
							<img
								src={SMALL_IMG_BASE_URL + entry.image}
								alt='History image'
								className='size-16 rounded-full object-cover mr-4'
							/>

							{/* inofrmation about the history entry such as title and date serached */}
							<div className='flex flex-col'>
								<span className='text-white text-lg'>{entry.title}</span>
								<span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
							</div>

							{/* will show different coloured buttons if serach item is person, movie or show */}
							<span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									entry.searchType === "movie"
										? "bg-red-600"
										: entry.searchType === "tv"
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							>
								{/* formates the button text  */}
								{entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
							</span>

							{/* lucide react icon */}
							<Trash
								className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600'
								onClick={() => handleDelete(entry)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default historyPage;