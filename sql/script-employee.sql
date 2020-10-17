CREATE TABLE public.employee (
	id uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	job_role varchar(255) NOT NULL,
	salary numeric(12,2) NOT NULL,
	employee_registration int4 NOT NULL,
	birth date NOT NULL,
	CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id),
	CONSTRAINT "UQ_de89877abc6c2a90d3cbc875ba6" UNIQUE (employee_registration)
);

INSERT INTO public.employee (id,name,job_role,salary,employee_registration,birth) VALUES
	 ('cd7524ed-b2d3-4d98-a66f-2ccaa8fe1326','Eduardo Neri','Software Engineering',6741.58,798654321,'2009-03-19'),
	 ('78086dcf-df24-483d-9e4d-711b6153b961','Anderson Dias','Software Engineering',8741.00,123456789,'1982-06-05'),
	 ('4de92bd2-d599-4fdb-9725-65300f90fe8e','Luciana Neri','Software Design',4741.00,987654321,'1984-01-19');