import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories, getData } from "../redux/questionsReducer"
import { ready } from "../redux/gamePlayReducer"

const topCategories =
    [
        { id: 9, icons: 'fa-solid fa-brain', name: "General Knowledge", color:"green" },
        { id: 10, icons: 'fa-solid fa-book', name: " Books" },
        { id: 11, icons: 'fa-solid fa-film', name: " Film" },
        { id: 12, icons: 'fa-solid fa-music', name: " Music" },
        { id: 15, icons: 'fa-solid fa-gamepad', name: " Video Games" },
        { id: 17, icons: 'fa-solid fa-microscope', name: "Science & Nature" },
        { id: 18, icons: 'fa-solid fa-laptop-code', name: "Science: Computers" },
        { id: 27, icons: 'fa-solid fa-paw', name: "Animals" },
        { id: 28, icons: 'fa-solid fa-car', name: "Vehicles" },
        { id: 29, icons: 'fa-solid fa-face-laugh-squint', name: " Comics" },
     
    ]
function Categories() {
    const Allcategories = useSelector(cat => cat.questionStore.categories)
    const dispatch =useDispatch()
    const moreCat = Allcategories?.filter(e=>!topCategories.map(e=>e.id).includes(e.id))
    useEffect(() => {
       !Allcategories&&dispatch(getCategories())
    },[dispatch,Allcategories])
    return (
        <section className='px-10 relative '>
            <div className='flex justify-between px-3'>
                <p className=" text-text text-2xl"> Quiz Categories</p>
                <p className='peer cursor-pointer text-xl text-textSecond'> view more</p>
                <div className="absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[50vh] overflow-y-scroll scroll rounded-xl flex flex-col bg-white p-2 right-20 top-6 cursor-pointer translate-x-32 scale-0 peer-hover:scale-100 hover:scale-100 hover:translate-x-0 peer-hover:translate-x-0 transition hover:duration-300">
                    {moreCat?.map(e =>
                        <span className='px-2 text-text rounded-md m-1 hover:bg-light hover:scale-105' key={e.id}
                            onClick={() => {
                                        dispatch(getData(e.id))
                                        dispatch(ready())
                                        }}>
                           { e.name.includes('Entertainment:') ? e.name.slice(14) : e.name}
                        </span>
                    )}
                </div>
            </div>
            <div className='grid grid-cols-5' >
                {topCategories?.map(e => <Category dispatch={dispatch} key={e.id} id={e.id} color={e.color} name={ e.name} icon={e.icons} />)}
            </div>
        </section>
    )
}

function Category({name,icon,id,dispatch}) {
    return (
        <div className="p-2 text-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex bg-white flex-col justify-center  cursor-pointer hover:scale-105 m-2 rounded-lg text-center"
            onClick={() => {
                dispatch(getData(id));
                dispatch(ready())
            }}
        >
            <i className={`${icon} text-second text-xl `}></i>
            <p className='text-dark'> {name.includes('Entertainment:')?name.slice(14):name}</p>
        </div>
    )
}
export default Categories
