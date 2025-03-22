import { Category } from '@renderer/pages/Category'
import CategoryLoader from '@renderer/pages/Category/CategoryLoader'
import Config from '@renderer/pages/Config'
import { ContentList } from '@renderer/pages/ContentList'
import ContentListLoader from '@renderer/pages/ContentList/ContentListLoader'
import Home from '@renderer/pages/Home'
import { Content } from '@renderer/pages/Content'
import { createHashRouter } from 'react-router-dom'
import ContentLoader from '@renderer/pages/Content/ContentLoader'
import ContentAction from '@renderer/pages/Content/ContentAction'
import { Welcome } from '@renderer/pages/Welcome'
import ContentListAction from '@renderer/pages/ContentList/ContentListAction'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/config',
    element: <Config />,
    children: [
      {
        path: 'category',
        element: <Category />,
        loader: CategoryLoader,
        children: [
          {
            path: 'contentList/:cid?',
            loader: ContentListLoader,
            action: ContentListAction,
            element: <ContentList />,
            children: [
              { index: true, element: <Welcome /> },
              {
                path: 'content/:id',
                loader: ContentLoader,
                action: ContentAction,
                element: <Content />
              }
            ]
          }
        ]
      }
    ]
  }
])

export default router
