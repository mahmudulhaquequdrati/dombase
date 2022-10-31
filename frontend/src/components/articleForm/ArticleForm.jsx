import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createArticle } from '../../features/author/authorSlice'
import { FaFileAlt } from 'react-icons/fa'
import './ArticleForm.css'

function ArticleForm() {
  const [url, setUrl] = useState('')

  const [formData, setFormData] = useState({
    league: '',
    team: '',
    title: '',
    article: '',
    articleImage: ''
  })

  const { league, team, title, article, articleImage } = formData
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    // send img to imgbb
     let formInfoData = new FormData();
    // the image shoud be same {image,file direction}
    formInfoData.append('image', formData.articleImage);
    formInfoData.append("key", `c8818fe821c0aee81ebf0b77344f0e2b`);
    axios
      .post('https://api.imgbb.com/1/upload', formInfoData,
    )
      .then(res => {
        alert('success')
        setUrl(res.data.data.url);
      });
  };
  console.log(url);
    const formInfo = {
      formData,
      url
    }

    dispatch(createArticle(formInfo));
    setFormData('')
  

  const onImgChange = (e) => {
    setFormData({ ...formData, articleImage: e.target.files[0] })
  }




  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }))
    console.log(e.target.articleImage)
  }



  return (
    <>
      <section className='f-heading'>
        <h3 style={{ marginTop: '15px' }}>
          <FaFileAlt /> Create an article

        </h3>
      </section>

      <section className='article-form'>
        <form onSubmit={onSubmit}>
          <div className="f-group">
            <input
              type="text"
              className="f-control"
              id='league'
              name='league'
              value={league} onChange={onChange}
              placeholder='Enter league name' />
          </div>

          <div className="f-group">
            <input
              type="text"
              className="f-control"
              id='team'
              name='team'
              value={team} onChange={onChange}
              placeholder='Enter team name' />
          </div>

          <div className="f-group">
            <input
              type="text"
              className="f-control"
              id='title'
              name='title'
              value={title} onChange={onChange}
              placeholder='Enter title' />
          </div>

          <div className="f-group">
            <textarea
              className="f-control"
              id='article'
              name='article'
              value={article} onChange={onChange}
              placeholder='Enter article' />
          </div>

          <div className="f-group">
            <input
              type="file"
              className="f-control"
              id='articleImage'
              name='articleImage'
              // value={articleImage}
               onChange={onImgChange}
              placeholder='Enter image' />
          </div>

          <div className="f-group">
            <button type='submit' className='f-btn btn-block '>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ArticleForm