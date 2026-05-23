import { useNavigate } from 'react-router'
import Header from '../general/header'
import { Code } from 'lucide-react'
import Card from '../general/Card'

type Snippet = {
  id: number
  name: string
  description: string
  tags: string[]
  code: string
}

const snippets: Snippet[] = [
  {
    id: 1,
    name: 'Snippet 1',
    description: 'Description of Snippet 1',
    tags: ['JavaScript', 'React'],
    code: `> This ~is not~ strikethrough, but ~~this is~~!

# Hello, *world*
`
  },
  {
    id: 2,
    name: 'Snippet 2',
    description: 'Description of Snippet 2',
    tags: ['Python', 'Flask'],
    code: ">print('Hello, World!')"
  },
  {
    id: 3,
    name: 'Snippet 3',
    description:
      'Description of Snippet 3Description of Snippet 3Description of Snippet 3Description of Snippet 3',
    tags: ['Java', 'Spring'],
    code: "System.out.println('Hello, World!');"
  },
  {
    id: 4,
    name: 'Snippet 4',
    description: 'Description of Snippet 4',
    tags: ['C++', 'Qt'],
    code: "#include <iostream>\nint main() { std::cout << 'Hello, World!'; return 0; }"
  },
  {
    id: 5,
    name: 'Snippet 5',
    description: 'Description of Snippet 5',
    tags: ['Ruby', 'Rails'],
    code: "puts 'Hello, World!'"
  }
]

const Snippets = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate('/snippets/create')
  }

  return (
    <div className="snippets-container">
      <Header
        title="Code Snippets"
        onClickHandler={onClickHandler}
        buttonText="Create New Snippet"
        description="Save, share, and discover reusable code snippets."
      />
      <div className="mt-6 grid gap-4 flex-row w-full px-3 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {snippets.map((snippet) => (
          <Card
            key={snippet.id}
            icon={<Code className="w-8 h-8 text-brand" />}
            title={snippet.name}
            description={
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full">
                {snippet.description}
              </div>
            }
            buttonText="Open"
            onClick={() => {
              navigate(`/snippets/${snippet.id}`, {
                state: {
                  snippetName: snippet.name,
                  snippetDescription: snippet.description,
                  snippetTags: snippet.tags,
                  snippetCode: snippet.code
                }
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Snippets
