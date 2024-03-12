const { request } = require('express')
const {supabase} = require('../config/database')
const { decode } = require('base64-arraybuffer')
const {generatEmbeddings} = require('../utils/matching_helpers')

const example_upload = async(req, res) => {
    const image_folder = "routine/"
    // const {data, error} = await supabase.storage.listBuckets()
    // console.log(data, error)

    // image file_name should be named uniquely
    const file_name = "example.png"
    const mime_type = "png"
    const file_path = image_folder + file_name

    const { data, error } = await supabase
    .storage
    .from('images')
    .upload(file_path, decode(example_base_64_png), {
        contentType: `image/${mime_type}`
  })
    if(error){
        res.status(400).json({error : error});

    }
    res.status(201).json({data: data});
}

const example_search = async (req,res) => {
    const requested_sentence = req.query.sentence
    console.log(requested_sentence)
    const words = requested_sentence.split(' ');
    const query_strong = words.join(' & ')
    const query_weak = words.join(' | ')

    const { data:strong_result, error:strong_error } = await supabase.from('ingredient')
        .select().textSearch('ingredient_name',query_strong)
    
    
    const { data:weak_result, error:weak_error } = await supabase.from('ingredient')
        .select().textSearch('ingredient_name', query_weak)

    if(strong_error){
        res.status(400).json({error : strong_error});
    }
    else if(strong_result.length < 1){
        if(weak_error){
            res.status(400).json({error : weak_error});
        }
        res.status(200).json({data: weak_result});
    }
    res.status(200).json({data: strong_result});
}


const create_embeddings_in_db = async(req,res) => {
    const {data:queryData, error:queryError} = await supabase.from('ingredient').select().is('embedding', null).limit(30)
    if (queryData[0] === null){
        return res.status(400);
    }
    const embedded = []
    for (const {ingredient_id, ingredient_name} of queryData) {
        console.log(ingredient_id, ingredient_name)
        const embedding = await generatEmbeddings(ingredient_name);
        embedded.push({"ingredient_id" : ingredient_id,"ingredient_name": ingredient_name ,"embedding" : embedding})
    }
    batchUpdate("ingredient", embedded);
    return res.status(200).json({data: embedded});
}

const batchUpdate = async(tableName, listOfObjects) => {
    // eg. [{id: 1, qty: 11}, {id: 2, qty: 9}, {id: 3, qty: 6}]
    const { data, error } = await supabase.from(tableName).upsert(listOfObjects)
    console.log(data, error)
    return error;
}

module.exports = {example_upload, example_search, create_embeddings_in_db}
const example_base_64_jpg = "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"
const example_base_64_png = "iVBORw0KGgoAAAANSUhEUgAAAP0AAADHCAMAAADlCqUFAAAAw1BMVEX////t3nqUj1TZzHCrpGSUjlTs3XPcznGUkFONilGknVn278f28Mbs3Xrx7M/XyWfs5r+Mh0Ti1XX489KemWfv7+mQi0z5+fa3tJHBtmjFwqippHmOiUiyr4nf3dCmoGKcl2LX1sWjm1Ln5tyrp33r3G2vqGm0rGXQzrj19PDBvqLs6+T79+T59dzx56Pt34Hv45Lh38rX1LnNyabEv5S6tYDq6Ne3sXjV0K3NwWy6r1eEfi+uqXbm25zy6KnbzGL067hMrDabAAAJ80lEQVR4nO2dC3ubuBKGDTGJ4pbN4jrYsYmLY/ckTtLL7rnmXLb7/3/VAQmJEUiAEzNDa319QgmWZV7NaHRBkUcjJycnJycnJyenznp+996md7UTW6p31VR7aqwu+vzlvB+Nh4//4eunc68fjYeOP//2qSd0Tn/3D2rAJj2f92V3QT9o/Oc+2Tn9+O43akib5v3Cc/rh4n/BoB8q/uceAx6gH9/9Tk1q0ree4SX9+O6v1Kh1zfs2vaIfT/5GDVtT745f0g8Q/13PMQ/SDw//PSb9ePJ3al5dqLbP8P9JDawJmT7Dn1MjA2HTj8d/GRA+Pv2QRrwU9ONramopEvrJUPBJ6MeTgQz4aeiHMt9BRD+QES8V/TBGvGT0g8Cnox/f/YsanpJ+APMdlPTjCTV+//T3TfjEA/7+6W8a6KkH/P3TX3wcLn7/9I2uTzzgR6BvNv54QjjgR6D3bprxCec7MOhbfD/DpxrxotCHLfRkA34Uem963+L8k6efmN4LW/FJBvxI9J730oJPMt+BRu9dtJifYr4Djz4z/7iRn2DAj0mf8d+PP4oS+DhWRfFR/kzQB/y49J539nJj179/+cnpvemZXVe//uz0XnhxyvQN5j8J+qz1O2l6i/lPhd7Mfzr0puh3QvQG858Ufc38p0VfNf+p0euNHyl92ANce57hQOipND1pehX9TpNemv9U6YX5T5aem5+APswDswjNoTjhx1D8pmJ2qA5Vhfw9xVHlorJSmTflyd84PWHbZzo/bfr3jt7RO3pH7+gdfW/0su8BeiUe7KCoi7LfEuppi15MWFwORZ/mVXk62yPT9zGn8Uo52zt6R+/oHf3w6Y/VbAyOviPYQfzWxIOjR5Wjd/TH1dyuX6fowqV/mEV2xZfompwh0t9G/rAUXN6j0d8mzHAHTB2qt2a8YWY575ZnTQb8sBf6TdR6Q82v15iskJ2KSLx6+QKYe7T9qgX9cHrf5iAH5BlMBHzoeXD25+j0UcudstfYvqV6tObpBwyYPkSnz++Odar3zABzYJ6GlAwn6h0/4Fttf4A02/fp+eLT8p+gOLPce6ClbAQMYMr2PHkCPRGW7bOPDYLKoXKDgUIJykNQA1K4Isnb8rwwDfSwPL9j9TxIB+TJ/IszAz8qfceo11UH5Zkv06n1+H+AqNesroUl1qhNYbMXHv9ZTlt7TyIm6SvuT+75b2PqXvnV8twpLj0rejBF9yTvoLy5GPIM4iTJRsxJEjNWdHqaxkNgcfK0R3rl+d2qQBIlceVS9XeT4ihdPGzW2+36YeFH1XcYGk+4NFu5fx+2Vw2yaKtB2xz4s9obrje7SBot4ntAznQbsl2RLyiyeAm3D3hacP6ihQ+E/EB2Frj0v0vg0S/EjvmsTp8XwKwwXsSZ9noebFXNN3qo5rBfNX4uY371j3L67OnWP15UdjP9aHQbA/rRg5ZJlT5OTbuEPuYJDBVfxBqf1f4kKXd/nKhXnnP666dC13u5+0kK6XXfr9DHsgDXj6vUT3fLrfh1kTQGU8PfI05xY76k34FZTn/J37aNIL3m+1XbiyTLJIq5XeNoJvhT+2jX4PlcfdBXbgI2RoL+FsboRNhyxQC95vs6fcS3C9kHCYjrIg6sIwM+K+DN9EdfpazoGQCXDbKJ3k8eOW8C6UVhGOhjnnhfmTmN1vnVtNLqMzn5gUrfIBO9H+XXuOtzek4CfF+jj+aCs5qxKkCbCOiB7ZvotxKX0z9uOIrKCNLHi/x8WcOM8vfMDTGHFdNf9ZiPaftG+rW8dU6/FPZdyUSQnhfUqG7jeDfaLle2sGds8Qbj+brtl9HtaAR8X7N9froxeDhjogmwioq+3t431/tlHGm+D+hjXi4L20CgocWjsH1Z7xvoRcxfxiW9H0PfB/QJb9psjF3HeEPy/IjDic6eouc2LqIYpF+PjMFtOPSNA9uCPhuVC0VRKkYs67Kvl3sB9H1Az7s6T4fT+3i2Z3p3g9U9f7uW2sp+vkih6P2k9H1In7++BfTpDGiVak+BGCtbPLR6L8fU9fl5RV/XCozxOH3MB/XcySH9XqeP9aFu/k74dAROLGDZPhCPH3wwtdBC/5TC8T2nB75ftf1TI70P6Euh0Xeo95r2m53CAfSl71fr/b6Vvi4827fTL28XQre7WRyBEQukV74PY/5G/4j4UU0VNNITtniG3k4SS+lJIX3h+5sI9nb4ZAAY/8VymuA/82Z6zKhnlbGvZ6EPCt9PSnpRECbIqIWeyvZaI3wIvfJ9OMrJT/eG2tVM75P0dOt3cQi99P1Zma+o+Ib3D9X2b6AvfP+xzJel+bmhr9ti+x+RvvB9mK+Yw9pWP4U1Rz08+qNFPX5hUy1VNhL4MAsWpfUWr7K440ekL/o8gF4M/0bzhXr+F0dpUUYDsL3vG9bYyCI5mF75vvJ1MR2Q8T/s8tY+mT0WjzOyDrPoYouernyAGIh+L3q9l8hgvHMwvfL9Ml8x8SVKYA52wl9GDLg75SinXGklH6UWg56D6aXvg1KN0239c9dpogytPhmMtDBHuIEvl4uVZ1yH0xe+rz3binYV/s1MawXq6/VQPV/avqZ0vdlsrCuZ44fs1WrZJMvsYmUeN4t0j+viUe71ZpHoz3ZkrIH1ADPm2wN/Pp9lfTFfjVJbysEvGqbwk6zVS1M/C3y1uexA+49rCL2d4+uwFWtE9N3XU3fXQWu0UaNeIENdAGN+ITX1J9fYvHaNnylPvbOhUlDbnqlVJK9kfXWeiE8xA/vqBVa9amFSPFa/7pynXEtAO7cDVis2r7HUViC0rkE0FIclT3p63697qXmNdgWsY4k2CXnliuFW9QWr5rtk4Fi7bE4v18g05olDX+/E1h7kiqvMnAh4PrPXfRnw1ItqfQ58lFV+Fta83iIWD9DEP+YXz/GKs+KHMbWkBGIC+drBB3n6lTyZOU9fy9O/x6G/bn7C2kOHp0uely8m+B52FV2+sa975PLhWV7emL86ooddRbdRFNvFKivYAx+Owi0K6qnM6VX/Eqa8ZC+Y35uxWdj13wm6bs5s3xlDsqNseIEqCzoVffMXGCGKajfhhi8wQhTdXspDMD/lTtL05qf95oiTpid3f+o91GmjHzU9rfnp6SmjH01fz/P0PTBOit5T9LIIiNx/CJ5PF/3I6VUFoDA/JX11FxB88w+BXu1yjh790OmfPxnrPY37X2F/F/KoeV9N3Oh39YxN/6VlW1FM819hw7e4Pmr0u/ofOv3oD62/U/q8OPD9/7DoP+PTj762b6mL4/5TAvjR3GvHx4h+39FjnsDvYP3+zf/9TxL4TH+0hj6v7+hHB59F/m+fOrh/f+xX0w908Dn/n1/PW/X9qhd9/4q9ebpB+w/t+qUHfZi335uTk5OTk5OTk5OTk5PTT63/A43obfQMuBndAAAAAElFTkSuQmCC"