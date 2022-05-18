// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import ResponseCard from './components/ResponseCard';

function App() {
  const [fetching, setFetching] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([
    // {
    //   prompt: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    //   response: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non architecto expedita iste, repellendus quas quam quis eius asperiores illum provident amet accusamus odio obcaecati cupiditate optio officia rerum ex autem molestiae quo facere veritatis labore consequatur! Similique rerum labore id atque? Quod aliquid ipsam aperiam ducimus voluptates officiis neque et!"
    // },
    // {
    //   prompt: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    //   response: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non architecto expedita iste, repellendus quas quam quis eius asperiores illum provident amet accusamus odio obcaecati cupiditate optio officia rerum ex autem molestiae quo facere veritatis labore consequatur! Similique rerum labore id atque? Quod aliquid ipsam aperiam ducimus voluptates officiis neque et!"
    // },
    // {
    //   prompt: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    //   response: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non architecto expedita iste, repellendus quas quam quis eius asperiores illum provident amet accusamus odio obcaecati cupiditate optio officia rerum ex autem molestiae quo facere veritatis labore consequatur! Similique rerum labore id atque? Quod aliquid ipsam aperiam ducimus voluptates officiis neque et!"
    // },
    // {
    //   prompt: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    //   response: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non architecto expedita iste, repellendus quas quam quis eius asperiores illum provident amet accusamus odio obcaecati cupiditate optio officia rerum ex autem molestiae quo facere veritatis labore consequatur! Similique rerum labore id atque? Quod aliquid ipsam aperiam ducimus voluptates officiis neque et!"
    // }
  ]);
  // prompt: "Write a poem about a dog wearing skis",
  const data = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }


  useEffect(() => {
    if (localStorage.getItem("promptResponses")) {
      console.log(JSON.parse(localStorage.getItem("promptResponses")));
      setResponses(JSON.parse(localStorage.getItem("promptResponses")));
      localStorage.setItem("promptResponses", JSON.stringify(JSON.parse(localStorage.getItem("promptResponses"))));

    }
  }, [])




  const fetchPrompt = (e) => {
    e.preventDefault();
    setFetching(true);
    
    console.log(prompt);
    console.log(data);
    // console.log("fetching");
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      },
      body: JSON.stringify(data),
    })
    .then(res => { return res.json() })
    .then(data => {
      // console.log(data);
      //   console.log(data.choices);
      //   console.log(data.choices[0]);
      //   console.log(data.choices[0].text);
      let newResponse = {
          prompt: prompt,
          response: data.choices[0].text
        }
        setResponses(prevState =>
          [...prevState, newResponse]
          )
          localStorage.setItem("promptResponses", JSON.stringify([...responses, newResponse]));
          // localStorage.setItem("promptResponses", JSON.stringify([responses]));
          console.log("done");
          setPrompt(" ")
        });
        console.log(responses)
        setFetching(false);
        // .then(data => console.log(data));
    
    // Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
  }

  const clearResponses = () => {
    localStorage.removeItem("promptResponses");
    setResponses([])
  }
  return (
    <div className="App">
      <main className=''>
        <div className="container mx-auto px-4">
          <div className=" h-screen max-h-screen w-full flex flex-col">
            <div className="h-fit text-center">
              <h1 className='text-5xl my-4'>
                Fun with API
              </h1>
              <div className="flex items-center justify-center gap-5">
              <p className='text-xl'>
                Ask me anything
              </p>
                {/* <button className="rounded-md bg-red-200 text-xl font-medium px-5 md:w-44 lg:w-60" type='button' onClick={() => clearResponses()}>Clear all</button> */}
                <button className="rounded-md text-red-500 text-lg font-medium underline" type='button' onClick={() => clearResponses()}>Clear all</button>
                </div>
            </div>
            <div className="responses-container flex-auto w-full">
              <div className="h-[70vh] flex overflow-y-auto p-3 w-full">
                <div className="w-full">
                  {
                    responses.map((response, i) => {
                      // console.log(response)
                      return (
                        <ResponseCard response={response} key={i} />
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="h-fit">
              <form className="form flex items-stretch gap-2 py-3" onSubmit={(e) => fetchPrompt(e)}>
                <textarea 
                rows="2" 
                placeholder='Enter Prompt...' 
                className="w-full border border-gray-300 rounded-md px-5 py-2.5 focus:shadow outline-none" 
                      value={prompt} onChange={(e) => setPrompt(e.target.value)}>
                </textarea>
                <button className="rounded-md bg-green-200 text-xl font-medium px-5 md:w-44 lg:w-60" type='submit' disabled={fetching}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
