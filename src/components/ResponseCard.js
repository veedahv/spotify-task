
function ResponseCard({ response }) {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="flex justify-end max-w-[90%] ml-auto my-3">
                    <div className="rounded-md bg-slate-100 p-3 md:p-5">
                        <h3 className="font-medium text-xs sm:text-sm">Prompt:</h3>
                        <p className="text-lg">
                            {response.prompt}
                        </p>
                    </div>
                </div>
                <div className="flex max-w-[90%] mr-auto my-3">
                    <div className="rounded-md bg-gray-300 p-3">
                        <h3 className="font-medium text-xs sm:text-sm">Response:</h3>
                        <p className="text-lg">
                            {response.response}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResponseCard;
