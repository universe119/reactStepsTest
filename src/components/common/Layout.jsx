export default function Layout({title, children}){
  return(
    <main className={title.toLowerCase()}>
      {/* toUpperCase 대문자
      toLowerCase 소문자 */}
      <h1>{title}</h1>
      
      <section>{children}</section>
    </main>
  );
}