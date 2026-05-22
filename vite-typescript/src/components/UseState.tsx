  // useState с числами
 /* const [count, setCount] = useState<number>(0);

        <button className="text-2xl" onClick={() => setCount(count + 1)}>
          жми
        </button>
        <div className="text-3xl">{count}</div>

  // 1. useState со строкой
  const [name, setName] = useState<string>("Иван");


  // 2. useState с булевым значением
  const [isVisible, setIsVisible] = useState<boolean>(true);

        <h2>Видимость: {isVisible ? "Видно" : "Скрыто"}</h2>
        <Button color="secondary" size="small" title="Изменить видимость" onClick={() => setIsVisible(!isVisible)}>
        </Button>

  // 3. useState с массивом
  const [items, setItems] = useState<string[]>(["яблоко", "банан", "вишня"]);
  
  const [newElement, setNewElement] = useState<string>("");

        <h3>Список:</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <input className='border-black-200 border-2' onChange={(e) => setNewElement(e.target.value)}
        ></input>
        <Button color="secondary" size="small" title="Добавить в список" onClick={() => setItems([...items, newElement])}>
        </Button>

  // 4. useState с объектом
  const [user, setUser] = useState<IUserType>({ name: "Иван", age: 27});

        <h4>
          Пользователь: {user.name}, возраст: {user.age}
        </h4>
        <button onClick={() => setUser({ ...user, age: user.age + 1 })}>
          Увеличить возраст
        </button>
*/