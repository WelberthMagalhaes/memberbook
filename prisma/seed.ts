import { $Enums, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando o processo de seed...');

    // Gerar 20 pessoas fictícias
    const peopleData = Array.from({ length: 20 }, () => {

        const baptismDate = faker.datatype.boolean()
            ? new Date(faker.date.past({ years: 10 }).toISOString().split('T')[0])
            : null; // Alguns têm data de batismo, outros não

        return {
            name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            birth_date: new Date(faker.date.birthdate({ min: 18, max: 70, mode: 'age' }).toISOString().split('T')[0]),
            email: faker.internet.email(),
            phone: generatePhone(),
            is_member: baptismDate !== null,
            baptism_date: baptismDate,
        };
    });

    // Inserir as pessoas no banco
    const people = await prisma.people.createMany({
        data: peopleData,
    });
    console.log(`✅ Inseridas ${peopleData.length} pessoas.`);

    // Selecionar IDs das pessoas criadas
    const allPeople = await prisma.people.findMany();

    // Gerar endereços fictícios para cada pessoa
    const addressData = allPeople.map((person) => ({
        street: faker.location.street(),
        neighborhood: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        postal_code: faker.location.zipCode('#####-###'),
        people_id: person.id,
    }));

    // Inserir os endereços no banco
    await prisma.address.createMany({
        data: addressData,
    });
    console.log(`✅ Inseridos ${addressData.length} endereços.`);

    // Criar 3 usuários fictícios
    const hashedPassword = await bcrypt.hash('password123', 10);
    const usersData = allPeople.slice(0, 3).map((person, index) => ({
        person_id: person.id,
        role: index === 0 ? $Enums.role.ADMIN : index === 1 ? $Enums.role.MANAGER : $Enums.role.USER, // Papéis diferentes
        password: hashedPassword,
    }));

    // Inserir usuários no banco
    await prisma.users.createMany({ data: usersData });
    console.log(`✅ Inseridos ${usersData.length} usuários.`);

    console.log('🎉 Seed concluído com sucesso!');
}

function generatePhone() {
    const ddd = faker.number.int({ min: 10, max: 99 });
    const prefix = faker.number.int({ min: 9000, max: 9999 });
    const suffix = faker.number.int({ min: 1000, max: 9999 });
    return `+55(${ddd})9${prefix}-${suffix}`;
}

main()
    .catch((e) => {
        console.error('Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });