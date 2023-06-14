'use client';

interface ClassContainerProps {
  children: React.ReactNode
};

const ClassContainer: React.FC<ClassContainerProps> = ({ children }) => {
  return ( 
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
        max-h-screen 
        overflow-y-auto"
    >
      {children}
    </div>
   );
}
 
export default ClassContainer;
