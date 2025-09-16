import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonAdd from './components/ButtonAdd'
//import HeaderTxt from './components/HeaderTxt'

function App() {

type Member = {
    nameTH: string;    // ชื่อภาษาไทย
    nameEN: string;    // ชื่อภาษาอังกฤษ
    heightCm: number;  // ส่วนสูง (เซนติเมตร)
    age: number;       // อายุ (ปี)
    imageUrl?: string; // URL รูปภาพ (ไม่บังคับ)
    group?: string;    // กลุ่ม (ไม่บังคับ)
};

const BUS_MEMBERS: Member[] = [
{ nameTH: "อลัน พศวีร์ ศรีอรุโณทัย", nameEN: "Alan", heightCm: 185, age: 23 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "มาร์ค กฤษณ์ กัญจนาทิพย์", nameEN: "Marckris", heightCm: 172, age: 22 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "ขุนพล ปองพล ปัญญามิตร", nameEN: "Khunpol", heightCm: 179, age: 22 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "ฮาร์ท ชุติวัฒน์ จันเคน", nameEN: "Heart", heightCm: 174, age: 22 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "จินวุค คิม", nameEN: "Jinwook", heightCm: 178, age: 21 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "ไทย ชญานนท์ ภาคฐิน", nameEN: "Thai", heightCm: 178, age: 20 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "เน็กซ์ ณัฐกิตติ์ แช่มดารา", nameEN: "Nex", heightCm: 180, age: 20 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "ภู ธัชชัย ลิ้มปัญญากุล", nameEN: "Phu", heightCm: 180, age: 20 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "คอปเปอร์ เดชาวัต พรเดชาพิพัฒ", nameEN: "Copper", heightCm: 173, age: 19 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "เอเอ อชิรกรณ์ สุวิทยะเสถียร", nameEN: "AA", heightCm: 178, age: 19 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "จั๋ง ธีร์ บุญเสริมสุวงศ์", nameEN: "Jungt", heightCm: 173, age: 19 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "ภีม วสุพล พรพนานุรักษ์", nameEN: "Peem", heightCm: 187, age: 19 , imageUrl: "https://i.pinimg.com/736x/16/1b/31/161b31090f9e67c435623c3af3638a42.jpg", group: "BUS"},
{ nameTH: "พี่น่า", nameEN: "Karina", heightCm: 168, age: 25 , imageUrl: "https://i.pinimg.com/1200x/1b/c2/d6/1bc2d677fe0978fcf5472055b08bd939.jpg", group: "Aespa"},
{ nameTH: "น้องหนาว", nameEN: "Winter", heightCm: 165, age: 24 , imageUrl: "https://i.pinimg.com/736x/ad/ae/26/adae265e55178be5394b390fff97306f.jpg", group: "Aespa"},
{ nameTH: "มาดามจือ", nameEN: "Giselle", heightCm: 166, age: 24 , imageUrl: "https://i.pinimg.com/736x/55/26/03/55260370f2401b5aeb6cf754c06433ba.jpg", group: "Aespa"},
{ nameTH: "หนิงหนิง", nameEN: "Ningning", heightCm: 165, age: 22 , imageUrl: "https://i.pinimg.com/736x/53/e7/fa/53e7fa96c96567ae1938a3a9e2d84da2.jpg", group: "Aespa"}];
  return (
    <>
    <ul>
        {BUS_MEMBERS.map((member,index) => (
          
            <li key={index}
              className ={member.group === "BUS" ? "red-txt" : "blue-txt"}>
              {member.nameTH} ({member.nameEN})
                <img src={member.imageUrl} width='100' />
            </li>
        ))}
    </ul>
      <div>
        {/* <HeaderTxt title='Header Computer Science' textSize='100' status={false}/>
        <HeaderTxt title='Maejo University' textSize='50' status={true}/> */}
        <h2>{126+1}</h2>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <ButtonAdd />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
