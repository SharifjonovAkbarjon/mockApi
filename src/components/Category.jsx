import React, { useEffect, useState } from 'react'
import { useCreateCategoryMutation, useGetCategoryQuery, useDeleteCategoryMutation, useUpdateCategoryMutation } from '../redux/api/category-api'
import nancy from '../assets/nancy.png'
import conor from '../assets/conor.png'
import selena from '../assets/selena.png'
import bobur from '../assets/bobur.png'


const Category = () => {
  const [updateCategoryItem, setUpdateCategoryItem] = useState(null)
  const { isLoading, data, isSuccess, isError, error } = useGetCategoryQuery()
  const [createCategory, { data: createData, isLoading: createLoading }] = useCreateCategoryMutation()
  const [deleteCategory, { }] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const handleCreateCategory = (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    createCategory(data)
      .unwrap()
      .then(() => {
        event.target.reset()
      })

  }

  const handleUpdateCategory = (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    updateCategory({ id: updateCategoryItem.id, body: data })
      .unwrap()
      .then(() => setUpdateCategoryItem(null))

  }


  return (
    <div className='container flex  gap-3'>
      <form className='flex flex-col gap-3 mt-10' onSubmit={handleCreateCategory} action="">
        <input required type="text" name='fname' placeholder='fname' />
        <input type="text" name='lname' placeholder='lname' />
        <input type="text" name='job' placeholder='job' />
        <input required type="text" name='gender' placeholder='gender' />
        <input type="text" name='bio' placeholder='bio' />
        <button className='bg-[green]'>{createLoading ? "Loading... " : "Create"}</button>
      </form>

      {
        updateCategoryItem &&
        <div className='bg-[#00001148]  fixed h-[100%] py-4 px-[100px] w-[100%]'>
          <div className=' w-[400px] top-0  left-0'>
            <form className='top-0 px-2 py-2 left-0 flex flex-col gap-3 bg-white' onSubmit={handleUpdateCategory} action="">
              <input defaultValue={updateCategoryItem.fname} type="text" name='fname' />
              <input defaultValue={updateCategoryItem.lname} type="text" name='lname' />
              <input defaultValue={updateCategoryItem.job} type="text" name='job' />
              <input defaultValue={updateCategoryItem.gender} type="text" name='gender' />
              <input defaultValue={updateCategoryItem.bio} type="text" name='bio' />
              <button className='w-[350px] bg-green-700'>Save</button>
              <button className='w-[350px]' onClick={() => setUpdateCategoryItem(null)}>Cancel</button>
            </form>
          </div>
        </div>


      }

      {isLoading && <h3>Loading...</h3>}
      <div className='flex flex-wrap gap-[20px] '>
        {
          data?.map((category) => (
            <div className='gap-4' key={category.id}>
              <div className='shadow-2xl w-[250px]  rounded-[20px] py-[20px] px-[20px] text-center flex flex-col gap-1'>
                {/* <img className='' src={category.fname === "Jonny" ? jonny :  && category.gender === "male"? conor : selena} alt="" /> */}
                <img className='h-[130px] object-contain' src={category.fname === "Boburmirzo" ? bobur : category.gender === "male" ? conor : selena} alt="" />
                <h5 className=''>{category.fname}</h5>
                <h5>{category.lname}</h5>
                <h5>{category.job}</h5>
                <h5>{category.gender}</h5>
                <h5>{category.bio}</h5>
                <button onClick={() => deleteCategory(category.id)}>Delete</button>
                <button className='bg-[yellowgreen]' onClick={() => setUpdateCategoryItem(category)}>Edit</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Category