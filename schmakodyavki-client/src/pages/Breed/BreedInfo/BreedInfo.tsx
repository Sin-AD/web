import React from 'react';
import {useLastPathElement} from "../../../hooks/useLastPathElement";

export const BreedInfo = () => {
    const breed = useLastPathElement();

    const cats: Record<string, { description: string; character: string; appearance: string }> = {
        "angora": {
            description: "The Angora cat, or Turkish Angora, is a breed of domestic cats created by breeders based on a group of individuals exported from Ankara Zoo (Turkey) in the mid-20th century. The average lifespan of Angora cats is 12-15 years, but with good care, they can live up to 20 years.",
            character: "Turkish Angoras are playful, affectionate, and loyal cats. They are active, intelligent, and curious. They strive to be the center of attention and often contribute to conversations among people. They dislike being left alone and can play with their humans for hours. They are very attached to their owners, preferring one primary caregiver. They have a unique way of 'talking,' replacing the usual meowing with rumbling, guttural sounds (with their mouths closed).",
            appearance: "The Turkish Angora is an elegant medium-sized cat with silky semi-long hair. It belongs to the group of cat breeds with heterochromia. Weights range from 3 to 5 kg, with males generally being larger than females. The most desirable coat color is white, but other variations are also recognized by feline organizations."
        },
        "british": {
            description: "The British Shorthair is considered one of the oldest and most popular breeds in the UK. It emerged in the late 19th century and spread worldwide due to its friendly character and appealing appearance. British Shorthairs are well adapted to urban living and can thrive in both apartments and houses. Their average lifespan is 12-15 years, but they can live longer with proper care.",
            character: "British Shorthairs are known for their independence and calm temperament. They do not require constant attention and can spend time alone, making them suitable for busy people. However, despite their independence, they are devoted to their owners and enjoy spending time with family. These cats are usually not intrusive but will always be nearby if they need your attention.",
            appearance: "British Shorthairs immediately attract attention with their dense and plush fur. They have a strong, stocky body with a massive chest, large paws, and a round head with big eyes. Their fur comes in various colors, from classic blue to tabby and chocolate."
        },
        "exot": {
            description: "The Exotic Shorthair is a breed that is similar to the Persian cat but has a short, plush coat. It was developed in the United States in the 1950s and 1960s through crossbreeding with American Shorthairs and Burmese. The Exotic Shorthair quickly gained popularity due to its appealing appearance and friendly personality. The average lifespan is around 12-15 years.",
            character: "Exotic Shorthairs are calm, affectionate, and laid-back cats. They are friendly and sociable, getting along well with children and other pets. These cats love to be around their families and enjoy interactive playtime. While they are generally not overly active, they do appreciate some play and mental stimulation.",
            appearance: "Exotic Shorthairs have a round head, flat face, and large, expressive eyes. Their short, dense coat is soft and plush, coming in a variety of colors and patterns. They have a sturdy, compact body with short legs and a thick tail."
        },
        "kornish rex": {
            description: "The Cornish Rex originates from the UK, where it appeared in the 1950s due to a spontaneous mutation in a cat. This mutation led to the unique wavy fur in its descendants, which became the breed's trademark. Cornish Rexes typically live from 12 to 15 years but can live longer with proper care.",
            character: "Cornish Rexes are energetic and playful cats that love to be the center of attention. They are very sociable and often follow their owners around. They enjoy being near people, making them great companions. They also get along well with other pets and children, making them a good choice for families with various animals.",
            appearance: "Cornish Rexes are characterized by their smooth and wavy short fur, which feels like velvet. They have a slender body with well-defined muscles and are lightweight and graceful. Their large, wide ears, high cheekbones, and elongated triangular head give them a distinctive and elegant appearance."
        },
        "persian": {
            description: "The Persian cat is known for its long history dating back to the Ancient East, specifically to modern-day Persia (Iran). This breed, one of the oldest, was brought to Europe in the 17th century and has since become incredibly popular due to its exotic appearance and calm character. The average lifespan of Persian cats is usually 12-17 years.",
            character: "Persians are very calm and balanced cats that enjoy solitude and comfort. They are ideal companions for people who prefer a quiet and measured lifestyle. They do not require much activity and are often content to lie on their owner's lap or rest in a cozy corner.",
            appearance: "The main distinguishing feature of the Persian cat is its long, thick, and soft fur, which requires regular grooming. They have a round head with a flat face and nose, giving them an 'exotic' appearance. Their ears are small and widely spaced, and their large, round eyes can be bright colors ranging from golden to blue."
        },
        "scottish": {
            description: "The Scottish Fold is a unique breed known for its distinctively folded ears, which give it a charming appearance. The breed originated in Scotland in the 1960s and quickly became popular worldwide. Scottish Folds are known for their friendly nature and adaptability. Their average lifespan is around 12-15 years.",
            character: "Scottish Folds are gentle, affectionate, and social cats. They are known for their calm temperament and can get along well with other pets and children. These cats are playful and enjoy interactive games with their owners.",
            appearance: "Scottish Folds are medium-sized cats with a sturdy build. Their most notable feature is their folded ears, which can be either fully folded or partially upright. They have round faces, large eyes that can come in various colors, and short to medium-length fur."
        },
        "sfinks": {
            description: "Sphynx cats originated from a natural mutation in Canada in the 1960s. The breed became known for its unique feature—lack of fur. This rare and relatively young breed quickly gained popularity due to its unusual appearance and friendly character. Sphynx cats typically live 12-14 years but can live longer with good care.",
            character: "Sphynx cats are incredibly social and affectionate, loving attention. They are very attached to their owners and always strive to be at the center of events. These cats are active, playful, and curious.",
            appearance: "Sphynx cats are known for their complete or near-complete lack of fur, making their skin soft, warm, and velvety to the touch. They have large ears, prominent cheekbones, and big eyes, giving them an eccentric appearance."
        },
        "siberian": {
            description: "The Siberian cat is an indigenous breed that naturally evolved in Siberia and other cold regions of Russia. This breed has been known since ancient times and developed without human intervention, making it genetically strong. The average lifespan of a Siberian cat is 12-15 years.",
            character: "Siberians are energetic, independent, and affectionate cats. They are known for their intelligent and clever nature, easily learning new things and often playing active games with their owners.",
            appearance: "Siberian cats have strong, muscular bodies designed for survival in harsh conditions. Their fur is thick, water-repellent, and multi-layered. They have large paws with tufts of fur between their toes and a bushy tail."
        },
        "unknown": {
            description: "This category represents cats whose breeds are not identified or documented. They may have a mix of traits from various breeds or have unknown ancestry. Such cats can still be affectionate and loving companions, and they often have unique personalities.",
            character: "Unknown cats can have a wide range of personalities, from playful and energetic to calm and affectionate. Their behavior often depends on their upbringing and individual characteristics rather than breed-specific traits.",
            appearance: "The appearance of unknown cats can vary greatly. They may have short or long fur, various colors, and patterns. Since they are mixed breeds, their size and build can differ significantly."
        },
        "vatnaya palochka": {
            description: "The Vatnaya Palochka, or 'Watery Stick,' is a fictional breed known for its unusual characteristics and quirky appearance. This breed is popular in stories and folklore but does not exist in reality.",
            character: "The Vatnaya Palochka is often portrayed as a whimsical and playful cat, known for its unique personality and adventurous spirit. It is believed to enjoy exploring its surroundings and engaging in playful antics.",
            appearance: "The appearance of the Vatnaya Palochka is characterized by its unusual body shape and coloration, often depicted in a variety of creative and imaginative ways."
        }
    };

    const breedData = cats[breed];

    return (
        <section className="w-full h-auto bg-PaleTaupe flex flex-col justify-center items-center pb-6">
            <div className="flex flex-col justify-between items-center max-w-[1680px]">
                <div className="w-full flex flex-col justify-start">
                    <h2 className="text-[64px] uppercase font-bold text-BlackOlive xs:text-[32px] md:text-[48px]">{breed}</h2>
                </div>
                <div className="w-full flex flex-row md:flex-col md:justify-center md:items-center">
                    <img
                        src={`/breeds/${breed}.jpg`}
                        alt={`${breed} cat`}
                        className="rounded-md select-none max-w-[420px] max-h-[420px] w-full h-full"
                        width="420px"
                        height="420px"
                    />
                    {breedData ? (
                        <div
                            className="flex flex-col justify-start items-start space-y-4 text-[20px] text-BlackOlive ml-4 lg:text-[14px] xl:text-[16px]">
                            <div className="flex flex-col">
                                <h3 className="text-[24px] font-bold">Description</h3>
                                <p>{breedData.description}</p>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[24px] font-bold">Character</h3>
                                <p>{breedData.character}</p>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[24px] font-bold">Appearance</h3>
                                <p>{breedData.appearance}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-[20px] text-red-500">Breed information not available.</p>
                    )}
                </div>
            </div>
        </section>
    );
};
