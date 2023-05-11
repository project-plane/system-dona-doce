<template>
    <div class="card">
        <div class="frameInform">
            <h1>Dona <br/> Doce </h1>
            <p>Fornecemos bolos e salgados para sua empresa <br/> com rapidez e qualidade</p>
            <button>Entrar</button>
        </div>
        <div class="frameIlustration">
            <IlustrationHand/>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .card{
        padding: 0 4rem;
        border-radius: 2rem;
        background: var(--red);
        width: 100%;
        height: 70vh;
        display: grid;
        grid-template: 1fr / 1fr 1fr;

        
        .frameInform{
            padding-top: var(--space);
            display: grid;
            gap: 2rem;
            grid-template: repeat(3, min-content) / 1fr;
            
            
            h1{
                color: var(--bg_color);
                line-height: 4vw;
                font-size: 5vw;
            }
            p{
                color: var(--white);
            }
            button{
                color:var(--txt_color);
                background-color: #FEE45E;
                width: 20vw;
                height: 4vw;
                border-radius: 20rem;
                font-size: 1.4rem;
            }

        }
        .frameIlustration{
            display: flex;
            align-items: end;
            justify-content: end;
            height: inherit;
            width: 100%;
        }

        @include screen("tablet"){
            grid-template: 1fr 1rem / 1fr;

            .frameIlustration{
                height: auto;  
            }
        }
    }
</style>