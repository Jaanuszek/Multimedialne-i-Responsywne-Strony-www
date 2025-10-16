
const names = ['Grzegorz', 'Wiktoria', 'Mateusz', 'Ania', 'Sandra', 'Kasia', 'Izabela', 'Weronika'];

let  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9];


const countries = [
    { name: 'Nigeria', continent: 'Africa'},
    { name: 'Nepal', continent: 'Asia'},
    { name: 'Angola', continent: 'Africa'},
    { name: 'Poland', continent: 'Europe'},
    { name: 'Kenya', continent: 'Africa'},
    { name: 'Greece', continent: 'Europe'},
	{ name: 'France', continent: 'Europe'},
	{ name: 'China', continent: 'Asia'}
]

let people = [
    {"id":123, "name":"Rick Deckard", "email":"rick@bladerunner.org"},
    {"id":456, "name":"Roy Batty", "email":"roy@replicant.io"},
    {"id":789, "name":"J.F. Sebastian", "email":"j.f@tyler.com"},
    {"id":258, "name":"Pris", "email":"pris@replicant.io"}
];

let duplicateName = ['John', 'Paul', 'George', 'Ringo', 'Paul', 'Paul', 'Ringo'];


// 1. Na stronie wyświetl w sekcji 1 tylko imiona zawierające znak "r".  ( tablica names)
let namesWithOnlyR = names.filter(name => name.toLocaleLowerCase().includes('r'));
// document.getElementById('section1').innerText = namesWithOnlyR.join(', ');
const section1 = document.getElementById('section1');
section1.insertAdjacentHTML('afterend', `<p>${namesWithOnlyR.join(', ')}</p>`);
// 2. sprawdź czy tablica zawiera tylko elementy mniejsze niż 9. Wynik wyswietl na stronie w sekcji 2.
//      sprawdź, czy tablica zawiera jakieś elementy mniejsze niż 6. Wynik wyświetl w przeglądarce w sekcji 2
//      inkrementuj wszystkie elementy w tablicy numbers. Nastepnie stwórz nowa tablice zawierajaca tylko elementy nieparzyste. 
//      Nasteopnie Oblicz sumę wszystkich elementów z tablicy. Wynik wyswietl w sekcji 2
const section2 = document.getElementById('section2');
const allLessThan9 = numbers.filter(num => num < 9);
console.log(allLessThan9);

const someLessThan6 = numbers.some(num => num < 6);
console.log(someLessThan6);

const incrementedNumbers = numbers.map(num => num + 1);

const oddNumbers = incrementedNumbers.filter(num => num % 2 !== 0);

const sumOfOddNumbers = oddNumbers.reduce((acc, curr) => acc + curr, 0);

section2.insertAdjacentHTML('afterend', `<p>Wszystkie elementy mniejsze niż 9: ${allLessThan9.join(', ')}</p>
    <p>Czy są jakieś elementy mniejsze niż 6: ${someLessThan6}</p>
    <p>Inkrementowane liczby: ${incrementedNumbers.join(', ')}</p>
    <p>Nieparzyste liczby: ${oddNumbers.join(', ')}</p>
    <p>Suma nieparzystych liczb: ${sumOfOddNumbers}</p>`
);

// 3. Na stronie w sekcji 3 wyświetl tylko kraje z Europy
section3 = document.getElementById('section3');
const europeanCountries = countries.filter(country => country.continent === 'Europe').map(country => country.name);
console.log(europeanCountries);
section3.insertAdjacentHTML('afterend', `<p>${europeanCountries.join(', ')}</p>`);

// 4. Znajdź nazwiska wszystkich osób, które mają e-maile „replicant.io”. Wyświetlanie wyników na ekranie przegladarki w sekcji 4.

const section4 = document.getElementById('section4');
const replicantEmails = people.filter(person => person.email.includes('replicant.io')).map(person => person.name);
console.log(replicantEmails);
section4.insertAdjacentHTML('afterend', `<p>${replicantEmails.join(', ')}</p>`);

// 5. W sekcji 5 wyswietl tylko imiona osób, które nie sa zdublowane

const section5 = document.getElementById('section5');
const uniqueNames = duplicateName.filter((name, index, self) => self.indexOf(name) === index);
console.log(uniqueNames);
section5.insertAdjacentHTML('afterend', `<p>${uniqueNames.join(', ')}</p>`);

const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const section6 = document.getElementById('section6');
// W sekcji 6 wyswietl odpoiwiedzi dla nastepujacych pytań: 
//  1. Wypisz liste wszytkich firm 
const allCompanies = companies.map(company => company.name);

//  2.  Wypisz liste wszytkich pełnoletnich (tablica ages).
const pelnoletni = ages.filter(age => age > 18);
//  3.  Wypisz liste wszytkich firm  należacych do kategorii -  "Ratail".
const retailCompanies = companies.filter(company => company.category === 'Retail').map(company => company.name);
console.log(retailCompanies);
//  4.  Wypisz liste wszytkich firm rozpoczynajacych działanosc w latach 80.
const eighties = companies.filter(company => company.start >= 1980 && company.start < 1990).map(company => company.name);
console.log(eighties);
//  5.  Dodaj do tych wszytkich firm z punktu 4 prefix "Super". Wyniki wyswietl na ekranie.
const superCompany = eighties.map(name => `Super ${name}`);
console.log(superCompany);
//  6. Posiosrtuj liste firm pod katem długości działania na rynku działanosci. Wyniki wyswietl na ekranie. 
const sorted = companies.sort((a,b) => (b.end - b.start) - (a.end - a.start)).map(company => company.name);
console.log(sorted);
//  7. Wyswwietl sumaryczna liczbe lat działanosci firm z kategorii Technology. 
const summaryYearsTech = companies.filter(company => company.category === 'Technology').reduce((acc, company) => acc + (company.end - company.start), 0);
console.log(summaryYearsTech);
// 8.Kazdy rok z  tablicy ages zduplikuj. Następnie onlicz sume lat ale tylko dla lat większych od 40. Wynik napisz na ektranie.
const eight = ages.filter(age => age > 40).map(age => age * 2).reduce((acc, age) => acc + age, 0);
console.log(eight);
// W sekcji 6 wyswietl odpoiwiedzi dla nastepujacych pytań:
section6.insertAdjacentHTML('afterend', `<p>Wszystkie firmy: ${allCompanies.join(', ')}</p>
    <p>Pełnoletni: ${pelnoletni.join(', ')}</p>`);