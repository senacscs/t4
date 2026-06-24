// Script para popular o banco de dados com dados de teste
// Execute este script no console do navegador para criar dados de exemplo

async function popularBancoDeDados() {
    console.log('🚀 Iniciando população do banco de dados...');

    try {
        // 1. Criar médico de teste
        console.log('👨‍⚕️ Criando médico...');
        const medicoResult = await Auth.register({
            nome: 'Dr. Carlos Silva',
            email: 'carlos.silva@clinica.com',
            senha: '123456',
            tipo: 'medico'
        });

        if (!medicoResult.success) {
            console.log('Médico já existe, buscando...');
            // Se já existe, buscar
            var medicoId = await buscarUsuarioPorEmail('carlos.silva@clinica.com');
        } else {
            var medicoId = medicoResult.userId;
        }

        console.log('✅ Médico criado/encontrado:', medicoId);

        // Adicionar CRM ao médico
        await db.ref(`usuarios/${medicoId}`).update({ crm: '12345-SP' });

        // 2. Criar paciente de teste
        console.log('👤 Criando paciente...');
        const pacienteResult = await Auth.register({
            nome: 'Clara Dick',
            email: 'clara.dick@email.com',
            senha: '123456',
            tipo: 'paciente'
        });

        if (!pacienteResult.success) {
            console.log('Paciente já existe, buscando...');
            var pacienteId = await buscarUsuarioPorEmail('clara.dick@email.com');
        } else {
            var pacienteId = pacienteResult.userId;
        }

        console.log('✅ Paciente criado/encontrado:', pacienteId);

        // 3. Criar relacionamento médico-paciente
        console.log('🔗 Criando relacionamento...');
        await Database.Relacionamentos.criar(medicoId, pacienteId);
        console.log('✅ Relacionamento criado');

        // 4. Popular afetivograma (últimos 30 dias)
        console.log('📊 Populando afetivograma...');
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = hoje.getMonth() + 1;
        
        const emocoes = ['Tranquila', 'Neutra', 'Animada', 'Ansiosa', 'Irritada'];
        const intensidades = ['leve', 'neutro', 'elevada', 'critica'];

        for (let dia = 1; dia <= 21; dia++) {
            const emocaoRandom = emocoes[Math.floor(Math.random() * emocoes.length)];
            const intensidadeRandom = intensidades[Math.floor(Math.random() * intensidades.length)];

            await Database.Afetivograma.salvar(pacienteId, ano, mes, dia, {
                emocao: emocaoRandom,
                intensidade: intensidadeRandom,
                observacoes: dia % 3 === 0 ? `Dia ${dia} - Observações de teste` : ''
            });
        }
        console.log('✅ Afetivograma populado (21 dias)');

        // 5. Criar registros de diário
        console.log('📖 Criando registros de diário...');
        const textosDiario = [
            'Hoje foi um dia muito produtivo. Consegui completar todas as minhas tarefas e ainda tive tempo para relaxar.',
            'Me senti um pouco ansiosa hoje. Mas usei as técnicas de respiração e ajudou bastante.',
            'Dia excelente! Saí com amigos e me diverti muito. Estou me sentindo muito melhor.',
            'Tive alguns altos e baixos hoje, mas no geral foi tranquilo. A medicação está ajudando.',
            'Acordei com muita energia hoje. Fiz exercícios pela manhã e me senti ótima o dia todo.'
        ];

        for (let i = 0; i < textosDiario.length; i++) {
            await Database.Diario.criar(pacienteId, textosDiario[i]);
            // Pequeno delay para ter timestamps diferentes
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log('✅ 5 registros de diário criados');

        // 6. Criar alarmes
        console.log('⏰ Criando alarmes...');
        const alarmes = [
            {
                nome: 'Tomar medicação da manhã',
                horario: '08:00',
                dias: ['1', '2', '3', '4', '5', '6', '0'],
                observacoes: '1 comprimido com água, durante o café da manhã'
            },
            {
                nome: 'Exercício físico',
                horario: '18:00',
                dias: ['1', '3', '5'],
                observacoes: 'Caminhada de 30 minutos'
            },
            {
                nome: 'Meditação noturna',
                horario: '21:00',
                dias: ['1', '2', '3', '4', '5', '6', '0'],
                observacoes: '15 minutos de meditação antes de dormir'
            }
        ];

        for (const alarme of alarmes) {
            await Database.Alarmes.criar(pacienteId, alarme);
        }
        console.log('✅ 3 alarmes criados');

        // 7. Criar anotações médicas
        console.log('📝 Criando anotações médicas...');
        const anotacoes = [
            {
                tipo: 'orientacao',
                visibilidade: 'paciente',
                conteudo: 'Paciente demonstra boa evolução no controle emocional. Continuar com o registro diário no afetivograma e manter a rotina de medicação conforme prescrito.',
                prioridade: 'media'
            },
            {
                tipo: 'observacao',
                visibilidade: 'privada',
                conteudo: 'Paciente relata melhora significativa na qualidade do sono desde o ajuste da dosagem. Avaliar possibilidade de manutenção da dose atual.',
                prioridade: 'media'
            },
            {
                tipo: 'recomendacao',
                visibilidade: 'paciente',
                conteudo: 'Recomendo incluir atividades físicas leves na rotina, como caminhadas de 30 minutos, 3x por semana. Isso pode ajudar no controle da ansiedade.',
                prioridade: 'alta'
            },
            {
                tipo: 'observacao',
                visibilidade: 'privada',
                conteudo: 'Adesão ao tratamento está excelente (>90%). Paciente tem demonstrado comprometimento e responsabilidade com o autocuidado.',
                prioridade: 'baixa'
            }
        ];

        for (const anotacao of anotacoes) {
            await Database.Anotacoes.criar(medicoId, pacienteId, anotacao);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        console.log('✅ 4 anotações médicas criadas');

        // 8. Criar mais um paciente
        console.log('👤 Criando segundo paciente...');
        const paciente2Result = await Auth.register({
            nome: 'Maria Alves',
            email: 'maria.alves@email.com',
            senha: '123456',
            tipo: 'paciente'
        });

        if (!paciente2Result.success) {
            var paciente2Id = await buscarUsuarioPorEmail('maria.alves@email.com');
        } else {
            var paciente2Id = paciente2Result.userId;
        }

        console.log('✅ Segundo paciente criado/encontrado:', paciente2Id);

        // Relacionar com o mesmo médico
        await Database.Relacionamentos.criar(medicoId, paciente2Id);
        console.log('✅ Relacionamento criado para segundo paciente');

        // Alguns registros para o segundo paciente
        await Database.Diario.criar(paciente2Id, 'Hoje foi um dia difícil. Me senti muito desanimada e sem energia.');
        await Database.Afetivograma.salvar(paciente2Id, ano, mes, 21, {
            emocao: 'Triste',
            intensidade: 'elevada',
            observacoes: 'Dia muito difícil'
        });

        console.log('\n🎉 POPULAÇÃO DO BANCO CONCLUÍDA COM SUCESSO! 🎉\n');
        console.log('📋 Resumo:');
        console.log(`   - 1 Médico: carlos.silva@clinica.com (senha: 123456)`);
        console.log(`   - 2 Pacientes: clara.dick@email.com e maria.alves@email.com (senha: 123456)`);
        console.log(`   - 21 dias de afetivograma`);
        console.log(`   - 5 registros de diário`);
        console.log(`   - 3 alarmes`);
        console.log(`   - 4 anotações médicas`);
        console.log(`\n✨ Você já pode fazer login com qualquer uma das contas!`);

    } catch (error) {
        console.error('❌ Erro ao popular banco de dados:', error);
    }
}

// Função auxiliar para buscar usuário por email
async function buscarUsuarioPorEmail(email) {
    const snapshot = await db.ref('usuarios')
        .orderByChild('email')
        .equalTo(email.toLowerCase())
        .once('value');
    
    let userId = null;
    snapshot.forEach(child => {
        userId = child.key;
    });
    
    return userId;
}

// Executar a população
console.log('⚠️  ATENÇÃO: Este script irá popular o banco de dados com dados de teste.');
console.log('Para executar, digite: popularBancoDeDados()');
console.log('');

// Descomentar a linha abaixo para executar automaticamente
// popularBancoDeDados();
