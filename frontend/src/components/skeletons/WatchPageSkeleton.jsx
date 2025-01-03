
/**
 * WatchPageSkeleton component renders a skeleton screen with animated placeholders
 * to indicate loading state for the Watch Page.
 * 
 * Creates shimmer effect for loading state.
 *
 * @component
 * @example
 * return (
 *   <WatchPageSkeleton />
 * )
 */
const WatchPageSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-full h-96 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-3/4 h-6 mb-2 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimmer'></div>
			<div className='bg-gray-700 rounded-md w-full h-24 shimmer'></div>
		</div>
	);
};
export default WatchPageSkeleton;